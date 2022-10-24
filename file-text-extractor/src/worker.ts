const path = require('path')
import fs from 'fs'
import amqplib, { Connection, Channel } from 'amqplib'
import { cnpj, cpf } from 'cpf-cnpj-validator';
const lineReader = require('line-reader');
import { v4 as uuidv4 } from 'uuid';
import ConnectionRabbitmqSingleton from './util/ConnectionRabbitmqSingleton';
import rabbitmqConfig from './config/rabbitmq';
import database from './database';
import {
  DatabaseRowFileUpload,
  DatabaseRowFileProcessed,
  FileRowFileUpload
} from './database/models';

export { start_processor }

let amqp_channel: Channel;

async function start_processor() {
  try {
    // connection RabbitMQ Singleton
    amqp_channel = await ConnectionRabbitmqSingleton.getInstance();
    amqp_channel.consume(rabbitmqConfig.FILE_NEW, fn_consume_file_new);
  } catch (err: any) {
    console.log('ERR:', err);
  }
}

async function fn_consume_file_new(message: any) {
  const fileInfo: DatabaseRowFileUpload = JSON.parse(message.content.toString());
  const uriFile = path.resolve(__dirname, `../storage/${fileInfo.file_storage}`);

  try {
    lineReader.eachLine(uriFile, { encoding: 'utf8' }, async function (line: string, last: boolean) {
      const dynamicArrayValues: any = line.trim().split(/\s+/);

      // Avoid processing the file HEADER
      if ((dynamicArrayValues).includes('CPF')) return;

      const listColumn = 'cpf private incomplete date_last_purchase ticket_average ticket_last_purchase store_most_frequent store_last_purchase'.split(' ');

      // Populate object with row values
      const objLine: any = listColumn.reduce((accumulator, value, index) => {
        return { ...accumulator, [value]: dynamicArrayValues[index] };
      }, {});

      const objFileRowFileUpload: FileRowFileUpload = objLine;

      const objDatabaseRowFileProcessed: DatabaseRowFileProcessed = {
        ...objFileRowFileUpload,
        uuid: uuidv4(),
        cpf_valid: cpf.isValid(objFileRowFileUpload.cpf),
        store_most_frequent_valid: cnpj.isValid(objFileRowFileUpload.store_most_frequent),
        store_last_purchase_valid: cnpj.isValid(objFileRowFileUpload.store_last_purchase),
      }

      const isolationLevel = 'read committed';
      const trx = await database.transaction({ isolationLevel });
      await trx('tb_file_processed').insert(objDatabaseRowFileProcessed);
      await trx.commit();

      if (last) {
        await database('tb_file_upload')
          .where({ id: fileInfo.id })
          .first()
          .update({ process_status: 'FINISHED' }, ['process_status']);

        // ACK message in queue
        amqp_channel.ack(message);

        // Delete file
        fs.unlink(uriFile, function (err) {
          if (err) throw err;
          console.log(`File ${fileInfo.file_storage} file deleted!`);
        })
        return false;
      }
    });
  } catch (err: any) {
    console.error(
      `ERROR in fn_consume_file_new:\n`,
      `Could not complete processing table/id (tb_file_info/${fileInfo.id}).\n`,
      err
    );
    amqp_channel.nack(message);
  }
}
