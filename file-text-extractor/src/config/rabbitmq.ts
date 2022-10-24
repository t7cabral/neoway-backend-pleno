export default {
  HOST: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}`,
  FILE_NEW: 'file:new'
};
