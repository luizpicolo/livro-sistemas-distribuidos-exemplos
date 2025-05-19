import { consumerG } from "../configuration";
import { EachMessagePayload } from "kafkajs";

const consumer = (async (): Promise<void> => {
  try {
    await consumerG.connect();
    await consumerG.subscribe({
      topics: [
        process.env.KAFKA_TOPIC_A as string,
        process.env.KAFKA_TOPIC_B as string,
      ],
      fromBeginning: true,
    });

    console.clear();
    console.log("Iniciando consumidor G e aguardando dados");
    await consumerG.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload): Promise<void> => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
        const key = message.key?.toString() ?? "";
        const value = message.value?.toString() ?? "";
        console.log(`${prefix} ${key}#${value}`);
      },
    });
  } catch (error) {
    console.error("Erro no consumerG:", error);
  }
})();

export default consumer;
