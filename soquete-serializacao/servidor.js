const net = require('net');

const porta = 3001;

// Criar um servidor de socket
const server = net.createServer((socket) => {
  console.log('Cliente conectado');
  
  // Enviar uma mensagem para o cliente
  socket.write(`Requisição de ${socket.remoteAddress.toString('utf8')} na porta porta ${socket.remotePort}`)

  // Lidar com mensagens do cliente
  socket.on('data', (mensagem) => {
    console.log('Mensagem recebida do cliente:', JSON.parse(mensagem));
  });

  // Lidar com a desconexão do cliente
  socket.on('close', () => {
    console.log('Conexão fechada');
  });
});

// Começar a escutar por novas conexões
server.listen(porta, () => {
  console.log(`Servidor executando na porta ${porta}`)
});
