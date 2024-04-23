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

    channel.assertQueue(queueName, { durable: false }); // Set durable to false for non-persistent queue

    const message = 'Hello from RabbitMQ!';
    channel.sendToQueue(queueName, Buffer.from(message));
    console.log('Message sent:', message);

    setTimeout(() => {
      connection.close(); // Close connection after sending the message
    }, 500);
  });
});
