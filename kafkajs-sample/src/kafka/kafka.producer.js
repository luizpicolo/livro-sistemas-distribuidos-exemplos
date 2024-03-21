const { producer } = require("./../configuration");
const producerA = (async () => {
  try {
    await producer.connect();
    await producer.send({
      topic: process.env.KAFKA_TOPIC_A,
      messages: [
        {
          key: "message_from",
          value: `Producer A`,
        },
        {
          key: "time",
          value: `${Date.now()}`,
        },
        {
          key: "dummyCode",
          value: `${Math.round(Math.random() * 10)}`,
        },
      ],
    });
    await producer.send({
      topic: process.env.KAFKA_TOPIC_B,
      messages: [
        {
          key: "message_from",
          value: `Producer B`,
        },
        {
          key: "time",
          value: `${Date.now()}`,
        },
        {
          key: "dummyCode",
          value: `${Math.round(Math.random() * 10)}`,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
})();

module.exports = producerA;
