import * as net from 'net';
import { Produto } from './Produto';

const porta: number = 3001;

// Criar um servidor de socket
const server = net.createServer((socket: net.Socket) => {
  console.log('Cliente conectado');
  
  // Enviar uma mensagem para o cliente
  socket.write(`Requisição de ${socket.remoteAddress ?? 'desconhecido'} na porta ${socket.remotePort ?? 'desconhecida'}`);

  // Lidar com mensagens do cliente
  socket.on('data', (mensagem: Buffer) => {
    try {
      const obj = JSON.parse(mensagem.toString('utf8'))
      const produto = new Produto(obj.titulo, obj.preco);
      socket.write(`Produto com desconto: ${JSON.stringify(produto.aplicarDesconto(obj.desconto))}`);
    } catch (error) {
      console.error('Erro ao processar mensagem do cliente:', error);
    }
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