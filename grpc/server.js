import { loadPackageDefinition, Server, status, ServerCredentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

const tasksDefs = loadSync('./tasks.proto');
const tasksProto = loadPackageDefinition(tasksDefs);

const tasks = [
    { id: 1, title: 'Task 1' }
];

const grpcServer = new Server();
grpcServer.addService(tasksProto.TaskService.service, {
    findAll: (call, callback) => {
        callback(null, { tasks: tasks });
    },

    insertOne: (call, callback) => {
        tasks.push(call.request);
        callback(null, call.request);
    },
    
    findOne: (call, callback) => {
        const task = tasks.find(e => e.id == call.request.id);
        callback(null, task);
    },
});

const serverAddress = '0.0.0.0:5050';
grpcServer.bindAsync(serverAddress, ServerCredentials.createInsecure(), () => {
    console.info(`Server started on ${serverAddress}`);
    grpcServer.start();
});
