import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

const tasksDefs = loadSync('./tasks.proto');
const tasksProto = loadPackageDefinition(tasksDefs);

const clientGRPC = new tasksProto.TaskService('127.0.0.1:5050', credentials.createInsecure());

clientGRPC.findAll({}, (err, tasks) => {
    if (err) {
        console.error(err);
        return;
    } 

    //console.table(tasks);
});

clientGRPC.insertOne({ id: 2, title: 'Task 2' }, (err, task) => {
    if (err) {
        console.error(err);
        return;
    }

    //console.log('Task inserted:', task);
});

clientGRPC.findOne({ id: 4 } , (err, task) => {
    if (err) {
        console.error(err);
        return;
    }

    console.table(task);
});

clientGRPC.findAll({}, (err, tasks) => {
    if (err) {
        console.error(err);
        return;
    } 

    //console.table(tasks);
});
