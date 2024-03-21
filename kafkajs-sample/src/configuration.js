const dotenv = require("dotenv");
const { Kafka, logLevel } = require("kafkajs");

const configuration = (() => {
  dotenv.config();
  console.log(`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`);
  const kafka = new Kafka({
    logLevel: logLevel.NOTHING,
    brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
    // ssl: true,
    // sasl: {
    //   mechanism: "scram-sha-512", // scram-sha-256 or plain
    //   username: process.env.KAFKA_USERNAME,
    //   password: process.env.KAFKA_PASSWORD,
    // },
  });

  const producer = kafka.producer();

  const consumerA = kafka.consumer({
    groupId: "consumerA",
  });

  const consumerB = kafka.consumer({
    groupId: "consumerB",
  });

  const consumerG = kafka.consumer({
    groupId: "consumerGeneral",
  });

  return {
    producer,
    consumerA,
    consumerB,
    consumerG,
  };
})();

module.exports = configuration;
