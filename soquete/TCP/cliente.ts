import * as net from 'net';

// Criar um cliente de socket
const client: net.Socket = net.createConnection({
  host: '127.0.0.1',
  port: 3001
});

// Lidar com mensagens do servidor
// Um buffer é uma área de memória temporária usada para armazenar dados durante a transferência ou processamento. 
// No Node.js, ele lida com dados binários de forma eficiente, atuando como ponte entre strings e dados binários em 
// operações de E/S e rede.
client.on('data', (mensagem: Buffer) => {
  console.log('Mensagem recebida do servidor:', mensagem.toString('utf8'));
});

// Lidar com a desconexão do servidor
client.on('close', () => {
  console.log('Conexão fechada');
});

// Enviar uma mensagem para o servidor
client.write('Olá, servidor!\r\n', () => {
  //client.end();
});