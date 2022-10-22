import amqplib, { Connection, Channel } from 'amqplib';
import rabbitmqConfig from '../config/rabbitmq';
import check_and_create_ldap_sync_structure from '../helpers/check_and_create_ldap_sync_structure'

class ConnectionRabbitmq {
  private static connection: Connection;
  private static channel: Channel;

  private constructor() { }

  static getInstance = async () => {
    if (ConnectionRabbitmq.connection && ConnectionRabbitmq.channel) return ConnectionRabbitmq.channel;
    return this.connect();
  }

  static connect = async () => {
    const conn = await amqplib.connect(rabbitmqConfig.HOST);
    ConnectionRabbitmq.connection = await amqplib.connect(rabbitmqConfig.HOST);
    ConnectionRabbitmq.channel = await ConnectionRabbitmq.connection.createChannel();
    await check_and_create_ldap_sync_structure();
    return ConnectionRabbitmq.channel;
  }
}

export default ConnectionRabbitmq;