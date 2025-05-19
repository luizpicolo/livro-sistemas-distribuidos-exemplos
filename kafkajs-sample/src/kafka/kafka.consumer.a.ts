import { consumerA } from "../configuration";
import { EachMessagePayload } from "kafkajs";

const consumer = (async (): Promise<void> => {
  try {
    await consumerA.connect();
    await consumerA.subscribe({
      topic: process.env.KAFKA_TOPIC_A as string,
      fromBeginning: true,
    });

    console.clear();
    console.log("Iniciando consumidor A e aguardando dados");
    await consumerA.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload): Promise<void> => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
        const key = message.key?.toString() ?? "";
        const value = message.value?.toString() ?? "";
        console.log(`${prefix} ${key}#${value}`);
      },
    });
  } catch (error) {
    console.error("Erro no consumerA:", error);
  }
})();

export default consumer;
