import ConnectionRabbitmqSingleton from '../util/ConnectionRabbitmqSingleton'
import { Channel } from 'amqplib';
import rabbitmqConfig from '../config/rabbitmq';


const check_and_create_ldap_sync_structure = async () => {

  const channel: Channel = await ConnectionRabbitmqSingleton.getInstance();

  try {
    channel.on('error', err => {
      return Promise.reject(err.message);
    });

    await create_structure_sync_ldap(channel);

    await Promise.all([
      channel.checkQueue(rabbitmqConfig.FILE_NEW)
    ]);

    return Promise.resolve('Queues and exchanges exist!');
  } catch (err) {
    try {
      const res_create_structure = await create_structure_sync_ldap(channel);
      return Promise.resolve(res_create_structure);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

async function create_structure_sync_ldap(channel: Channel) {
  try {
    await channel.assertQueue(rabbitmqConfig.FILE_NEW, { durable: true });
    return Promise.resolve('Queues and Exchanges created successfully!');
  } catch (err: any) {
    return Promise.reject(err.message);
  }
}

export default check_and_create_ldap_sync_structure;
