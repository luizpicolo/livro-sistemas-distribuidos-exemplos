import { producer } from "../configuration";

const producerA = (async (): Promise<void> => {
  try {
    console.clear();
    console.log("Iniciando conexão");
    await producer.connect();

    console.log("Produzido dados Topico A");
    await producer.send({
      topic: process.env.KAFKA_TOPIC_A as string,
      messages: [
        { key: "message_from", value: "Producer A" },
        { key: "time", value: Date.now().toString() },
        { key: "dummyCode", value: JSON.stringify({ foo: "bar", count: 42 }) },
      ],
    });

    await producer.disconnect();
    console.log("Mensagens enviadas e conexão encerrada.");
  } catch (error) {
    console.error("Erro no producer:", error);
  }
})();

export default producerA;
