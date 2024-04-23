const amqp = require('amqplib/callback_api');

const queueName = 'my_queue'; // Replace with your desired queue name

amqp.connect('amqp://localhost:5672', (err, connection) => {
  if (err) {
    console.error('Error connecting to RabbitMQ:', err);
    process.exit(1);
  }

  connection.createChannel((err, channel) => {
    if (err) {
      console.error('Error creating channel:', err);
      connection.close();
      process.exit(1);
    }

    channel.assertQueue(queueName, { durable: false });

    channel.consume(queueName, (message) => {
      console.log('Received message:', message.content.toString());
    }, { noAck: true }); // Set noAck to true for automatic acknowledgment
  });
});
