import { producer } from "../configuration";

const producerA = (async (): Promise<void> => {
  try {
    console.clear();
    console.log("Iniciando conexão");
    await producer.connect();

    console.log("Produzido dados Topico B");
    await producer.send({
      topic: process.env.KAFKA_TOPIC_B as string,
      messages: [
        { key: "message_from", value: "Producer B" },
        { key: "time", value: Date.now().toString() },
        { key: "dummyCode", value: Math.round(Math.random() * 10).toString() },
      ],
    });

    await producer.disconnect();
    console.log("Mensagens enviadas e conexão encerrada.");
  } catch (error) {
    console.error("Erro no producer:", error);
  }
})();

export default producerA;
