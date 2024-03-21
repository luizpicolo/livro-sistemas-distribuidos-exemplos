const net = require('net');

// Criar um cliente de socket
const client = net.createConnection({
  host: 'localhost',
  port: 3001
});

// Lidar com mensagens do servidor
client.on('data', (mensagem) => {
  console.log('Mensagem recebida do servidor:', mensagem.toString('utf8'));
});

// Lidar com a desconexão do servidor
client.on('close', () => {
  console.log('Conexão fechada');
});

// Enviar uma mensagem para o servidor
client.write('Olá, servidor!\r\n', () => {
  client.end();  
});
