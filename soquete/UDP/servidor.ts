import * as dgram from 'dgram';

const porta: number = 3001;

// Criar um servidor UDP
const server: dgram.Socket = dgram.createSocket('udp4');

// Lidar com mensagens recebidas
server.on('message', (mensagem: Buffer, remoteInfo: dgram.RemoteInfo) => {
  console.log(`Mensagem recebida de ${remoteInfo.address}:${remoteInfo.port}: ${mensagem.toString('utf8')}`);

  // Enviar uma resposta para o cliente
  const resposta = `Olá, cliente de ${remoteInfo.address}:${remoteInfo.port}`;
  server.send(resposta, remoteInfo.port, remoteInfo.address, (err) => {
    if (err) {
      console.error('Erro ao enviar resposta:', err);
    } else {
      console.log('Resposta enviada ao cliente');
    }
  });
});

// Lidar com erros
server.on('error', (err: Error) => {
  console.error('Erro no servidor UDP:', err);
  server.close();
});

// Começar a escutar por mensagens UDP
server.bind(porta, () => {
  console.log(`Servidor UDP escutando na porta ${porta}`);
});