const { consumerA } = require("./../configuration");

const consumer = (async () => {
  try {
    await consumerA.connect();
    await consumerA.subscribe({
      topic: process.env.KAFKA_TOPIC_A,
      fromBeginning: true,
    });
    await consumerA.run({
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
