import * as net from 'net';

const porta: number = 3001;

// Criar um servidor de socket
const server: net.Server = net.createServer((socket: net.Socket) => {
  console.log('Cliente conectado');
  
  // Enviar uma mensagem para o cliente
  socket.write(`Requisição de ${socket.remoteAddress} na porta ${socket.remotePort}`);

  // Lidar com mensagens do cliente
  socket.on('data', (mensagem: Buffer) => {
    console.log('Mensagem recebida do cliente:', mensagem.toString('utf8'));
  });

  // Lidar com a desconexão do cliente
  socket.on('close', () => {
    console.log('Conexão fechada');
  });
});

// Começar a escutar por novas conexões
server.listen(porta, () => {
  console.log(`Servidor executando na porta ${porta}`);
});