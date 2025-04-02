import * as net from 'net';
import { ProdutoInterface } from './produto_interface';

// Criar um cliente de socket
const client = net.createConnection({
  host: '127.0.0.1',
  port: 3001
});

const produto: ProdutoInterface = {
  titulo: 'Produto Exemplo',
  preco: 100,
  desconto: 10
}

// Enviar uma mensagem para o servidor
client.write(JSON.stringify(produto));

// Lidar com mensagens do servidor
client.on('data', (mensagem: Buffer) => {
  console.log('Mensagem recebida do servidor:', mensagem.toString('utf8'));
});

// Lidar com a desconexão do servidor
client.on('close', () => {
  console.log('Conexão fechada');
});

client.end();