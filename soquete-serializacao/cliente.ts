import * as net from 'net';

// Definir o tipo para a pessoa
interface Person {
  name: string;
  age: string;
}

// Criar um cliente de socket
const client = net.createConnection({
  host: '127.0.0.1',
  port: 3001
});

const person: Person = {
  name: 'Picolo',
  age: '41'
};

// Lidar com mensagens do servidor
client.on('data', (mensagem: Buffer) => {
  console.log('Mensagem recebida do servidor:', mensagem.toString('utf8'));
});

// Lidar com a desconexão do servidor
client.on('close', () => {
  console.log('Conexão fechada');
});

// Enviar uma mensagem para o servidor
client.write(JSON.stringify(person));

client.end();