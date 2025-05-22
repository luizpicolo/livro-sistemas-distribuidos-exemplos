# Exemplos de Sistemas Distribuídos

Este repositório contém exemplos práticos de comunicação entre sistemas distribuídos utilizando diferentes tecnologias e protocolos, como TCP, UDP, gRPC e Kafka.

## Estrutura do Projeto

- **soquete/TCP/**: Exemplos de comunicação via socket TCP em Node.js e Python.
- **soquete/UDP/**: Exemplos de comunicação via socket UDP em Node.js.
- **soquete-serializacao/**: Exemplo de serialização de objetos para comunicação via socket TCP.
- **grpc/**: Exemplo de implementação de servidor e cliente gRPC com definição de serviços via Protobuf.
- **kafkajs-sample/**: Exemplo de uso do KafkaJS para produção e consumo de mensagens em tópicos Kafka.

## Como Executar

### Pré-requisitos

- Node.js (v16+)
- npm
- Docker (para rodar o Kafka)

### Instalação

Instale as dependências de cada módulo conforme necessário:

```sh
cd soquete/TCP
npm install

cd ../../soquete/UDP
npm install

cd ../../soquete-serializacao
npm install

cd ../../grpc
npm install

cd ../../kafkajs-sample
npm install