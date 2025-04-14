import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

// Interfaces baseadas no .proto
interface Task { id: number; title: string }
interface TaskList { tasks: Task[] }

const tasksDefs = loadSync('./tasks.proto');
const tasksProto = loadPackageDefinition(tasksDefs) as any;

const clientGRPC = new tasksProto.TaskService(
    '127.0.0.1:5050',
    credentials.createInsecure()
);

clientGRPC.FindAll({}, (err: Error | null, response: TaskList) => {
    if (err) {
        console.error(err);
        return;
    }
    console.table(response.tasks);
});

clientGRPC.InsertOne({ id: 2, title: 'Task 2' }, (err: Error | null, task: Task) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Task inserted:', task);
});

clientGRPC.FindOne({ id: 1 }, (err: Error | null, task: Task) => {
    if (err) {
        console.error(err);
        return;
    }
    console.table(task);
});

clientGRPC.FindAll({}, (err: Error | null, response: TaskList) => {
    if (err) {
        console.error(err);
        return;
    }
    
    console.table(response.tasks);
});