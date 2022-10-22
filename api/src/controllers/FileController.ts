'use strict';

import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { randomUUID } from 'crypto';
import { pick } from 'lodash';
import ConnectionRabbitmqSingleton from '../util/ConnectionRabbitmqSingleton';
import rabbitmqConfig from '../config/rabbitmq';
import database from '../database';

export { upload };

async function upload(request: Request, response: Response) {
  try {
    // connection RabbitMQ Singleton
    const channel = await ConnectionRabbitmqSingleton.getInstance();

    // Preparing object to save to database
    const files: any = request.files;
    const fileInfo: any = {
      id: randomUUID(),
      size: String(files.file1.size),
      file_storage: files.file1.tempFilePath.split('/').pop(),
      md5_calc: files.file1.md5,
      process_status: 'IN-PROGRESS',
      ...pick(files.file1, ['name', 'mimetype'])
    }

    // Save file information in database
    const data = await database.insert(fileInfo).into('tb_file_upload').returning('*');

    // Registers the file with the queue service to be processed asynchronously.
    channel.sendToQueue(rabbitmqConfig.FILE_NEW, Buffer.from(JSON.stringify(data)));

    return response.status(HttpStatus.OK).json(...data);
  } catch (err: any) {
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorCode: 'ERR_500_FILE_DOWNLOAD',
      message: err.message
    });
  }
}