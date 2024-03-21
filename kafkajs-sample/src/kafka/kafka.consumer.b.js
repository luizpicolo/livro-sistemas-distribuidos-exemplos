const { consumerB } = require("./../configuration");

const consumer = (async () => {
  try {
    await consumerB.connect();
    await consumerB.subscribe({
      topic: process.env.KAFKA_TOPIC_B,
      fromBeginning: true,
    });
    await consumerB.run({
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
        console.log(`- ${prefix} ${message.key}#${message.value}`);
      },
    });
  } catch (error) {
    console.log(error);
  }
})();

module.exports = consumer;
