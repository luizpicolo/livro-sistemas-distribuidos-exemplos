import * as dgram from 'dgram';

const portaServidor: number = 3001;
const enderecoServidor: string = '127.0.0.1'; // Altere para o endereço do servidor, se necessário

// Criar um cliente UDP
const client: dgram.Socket = dgram.createSocket('udp4');

// Mensagem a ser enviada ao servidor
const mensagem: string = 'Olá, servidor!';

// Enviar a mensagem para o servidor
client.send(mensagem, portaServidor, enderecoServidor, (err) => {
  if (err) {
    console.error('Erro ao enviar mensagem:', err);
    client.close();
  } else {
    console.log('Mensagem enviada ao servidor');
  }
});

// Lidar com a resposta do servidor
client.on('message', (resposta: Buffer) => {
  console.log('Resposta recebida do servidor:', resposta.toString('utf8'));
  client.close(); // Fechar o cliente após receber a resposta
});

// Lidar com erros
client.on('error', (err: Error) => {
  console.error('Erro no cliente UDP:', err);
  client.close();
});