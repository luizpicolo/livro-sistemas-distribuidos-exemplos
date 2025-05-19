import dotenv from "dotenv";
import { Kafka, logLevel, KafkaConfig, Producer, Consumer } from "kafkajs";

dotenv.config();

console.log(`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`);

const kafkaConfig: KafkaConfig = {
  logLevel: logLevel.NOTHING,
  brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
  // ssl: true,
  // sasl: {
  //   mechanism: "scram-sha-512",
  //   username: process.env.KAFKA_USERNAME,
  //   password: process.env.KAFKA_PASSWORD,
  // },
};

const kafka = new Kafka(kafkaConfig);

const producer: Producer = kafka.producer();

const consumerA: Consumer = kafka.consumer({ groupId: "consumerA" });
const consumerB: Consumer = kafka.consumer({ groupId: "consumerB" });
const consumerG: Consumer = kafka.consumer({ groupId: "consumerGeneral" });

export {
  producer,
  consumerA,
  consumerB,
  consumerG,
};
