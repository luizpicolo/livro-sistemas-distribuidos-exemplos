import grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';

type Task = { id: number; title: string };
type TaskList = { tasks: Task[] };
type TaskRequest = { id: number };
type Empty = {};

const tasksDefs = loadSync('./tasks.proto');
const tasksProto = (grpc.loadPackageDefinition as any)(tasksDefs).task as any;

const tasks: Task[] = [
    { id: 1, title: 'Task 1' }
];

const { Server, ServerCredentials, status } = grpc as any;
const grpcServer = new Server();

grpcServer.addService(tasksProto.TaskService.service, {
    // ServerUnaryCall representa a chamada recebida pelo servidor gRPC para métodos unários.
    // Ele fornece acesso à requisição enviada pelo cliente (call.request) e informações do contexto da chamada.
    FindAll: (_: ServerUnaryCall<Empty, TaskList>, callback: sendUnaryData<TaskList>) => {
        callback(null, { tasks });
    },

    InsertOne: (call: ServerUnaryCall<Task, Task>, callback: sendUnaryData<Task>) => {
        tasks.push(call.request);
        callback(null, call.request);
    },
    
    FindOne: (call: ServerUnaryCall<TaskRequest, Task>, callback: sendUnaryData<Task>) => {
        try {
            const task = tasks.find(e => e.id === call.request.id);
            if (!task) {
                throw new Error(`Tarefa com id ${call.request.id} não encontrada`);
            }

            callback(null, task);
        } catch (error) {
            callback({ code: status.NOT_FOUND, message: (error as Error).message}, null);
        }
    },
});

const serverAddress = '0.0.0.0:5050';
grpcServer.bindAsync(serverAddress, ServerCredentials.createInsecure(), () => {
    console.info(`Server started on ${serverAddress}`);
});