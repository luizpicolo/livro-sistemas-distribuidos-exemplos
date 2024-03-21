const { consumerG } = require("./../configuration");

const consumer = (async () => {
  try {
    await consumerG.connect();
    await consumerG.subscribe({
      topics: [process.env.KAFKA_TOPIC_A, process.env.KAFKA_TOPIC_B],
      fromBeginning: true,
    });
    await consumerG.run({
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
