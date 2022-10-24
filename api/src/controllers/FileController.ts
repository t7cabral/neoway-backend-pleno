'use strict';

import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { pick } from 'lodash';
import ConnectionRabbitmqSingleton from '../util/ConnectionRabbitmqSingleton';
import rabbitmqConfig from '../config/rabbitmq';
import database from '../database';

export { upload };

async function upload(request: Request, response: Response) {
  try {
    // connection RabbitMQ Singleton
    const channel = await ConnectionRabbitmqSingleton.getInstance();

    // Save record in database
    const files: any = request.files;
    const isolationLevel = 'read committed';
    const trx = await database.transaction({ isolationLevel });
    const ids = await trx('tb_file_upload').insert({
      size: String(files.file1.size),
      file_storage: files.file1.tempFilePath.split('/').pop(),
      md5_calc: files.file1.md5,
      process_status: 'IN-PROGRESS',
      ...pick(files.file1, ['name', 'mimetype'])
    });
    await trx.commit();

    const record = await database('tb_file_upload')
      .where('id', ids[0])
      .then(data => JSON.parse(JSON.stringify(data))[0]);

    // Registers the file with the queue service to be processed asynchronously.
    channel.sendToQueue(rabbitmqConfig.FILE_NEW, Buffer.from(JSON.stringify(record)));

    return response.status(HttpStatus.OK).json({ ...record });
  } catch (err: any) {
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorCode: 'ERR_500_FILE_DOWNLOAD',
      message: err.message
    });
  }
}