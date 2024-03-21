const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const tasksDefs = protoLoader.loadSync('./tasks.proto');
const tasksProto = grpc.loadPackageDefinition(tasksDefs);

const tasks = [
    { id: 1, title: 'Task 1' },
    { id: 2, title: 'Task 2' },
];

const grpcServer = new grpc.Server();
grpcServer.addService(tasksProto.TaskService.service, {
    findAll: (call, callback) => {
        try {
            const request = call.request;

            if (request.error) {
                throw new Error(request.error);
            }

            callback(null, { tasks: tasks });
        } catch (error) {
            callback(error);
        }
    },

    insertOne: (call, callback) => {
        const task = call.request;
        tasks.push(task);
        callback(null, task);
    },
    
    findOne: (_, callback) => {
        const id = _.request.id;
        const task = tasks.find(e => e.id == id);

        if (task) {
            callback(null, task);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'id not exists',
            });
        }
    },
});

grpcServer.bindAsync('0.0.0.0:5050', grpc.ServerCredentials.createInsecure(), () => grpcServer.start());

console.info('Server started on 0.0.0.0:5050');
