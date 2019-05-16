// createTask(obj)
// deleteTask(name)
// getAllTasks()
// getMyTasks()
// getAvailableTasks()
// getTask(name)

const path = process.cwd();
const Task = require(`${path}/schemas/taskSchema.js`);
const Users = require(`${path}/schemas/usersSchema.js`);
const {
    UserNotFound,
    TaskAlreadyExists,
    TaskNotFound
} = require(`${path}/errors/errors.js`);

async function createTask(task, username){
    console.log("createTask function called");
    try{
        let name = task.name;
        if(await Task.findTask(name)){
            throw new TaskAlreadyExists(name);
        }
        const user = await Users.findUsername(username);
        if(!user){
            throw new UserNotFound(username);
        }
        await Users.findOneAndUpdate({username}, {$push: {tasks: task}});
        await task.save( function (err, task) {
            if(err){ 
                throw err; 
                return;
            }
            console.log(name + " task created!");
        });        
        console.log(task);
    }
    catch(err){
        throw err;
    }
}
async function getTask(name) {
    try{
        console.log("getting task " + name);
        const task = await Task.findTask(name);
        if(!task){
            throw new TaskNotFound(name);
        }
        return task;
    }
    catch(error){
        throw new TaskNotFound(name);
    }
}

async function getAllTasks() {
    try{
        console.log("getting all tasks");
        return await Task.find({});
    }
    catch(err){
        throw err;
    }
}
async function getAvailableTasks(username) {
    try{
        console.log("getting all tasks");
         if(!await Users.findUsername(username)){
            throw new UserNotFound(username);
        }
        const tasks = await Users.findMyTasks(username);
        const taskIds = tasks.tasks;
        return await Task.find({'_id':{$nin:taskIds}});
    }
    catch(err){
        throw err;
    }
}
async function getMyTasks(username) {
    try{
        console.log("getting my tasks")
        if(!await Users.findUsername(username)){
            throw new UserNotFound(username);
        }
        const tasks = await Users.findMyTasks(username);
        const taskIds = tasks.tasks;
        console.log(taskIds);
        return await Task.findTasksByIds(taskIds);
    }
    catch(err){
        throw err;
    }
}

async function addTaskToUser(name, username) {
    console.log(`Sharing task ${name} with user ${username}`);
    try{
        if(!await Users.findUsername(username)){
            throw new UserNotFound(username);
        }
        const task = await Task.findTask(name);
        if(!task){
            throw new TaskNotFound(name);
        }
        await Users.findOneAndUpdate({username}, {$push: {tasks: task}});

    }
    catch(err){
        throw err;
    }
}


async function DeleteTask(name) {
    console.log("deleting task " + name);
     try{
        const task = await Task.findTask(name);
        if(!task){
            throw new TaskNotFound();
        }
        await Task.deleteOne({name});
        await Users.updateMany({tasks:task._id},{$pull:{tasks:task._id}});
        console.log(name + " task deleted!");
    }
    catch(error){
        throw error;
    }
}

async function removeFromTasks(_id, username) {
    console.log(`removing task ${_id} for user ${username}`);
     try{
        const task = await Task.findSingleTaskById(_id);
        if(!task){
            throw new TaskNotFound();
        }
        if(!await Users.findUsername(username)){
            throw new UserNotFound(username);
        }
        await Users.updateOne({username},{$pull:{tasks:_id}});
        console.log(_id + " task removed!");
    }
    catch(error){
        throw new TaskNotFound(name);
    }
}

module.exports = {
    createTask,
    getTask,
    getAllTasks,
    getMyTasks,
    getAvailableTasks,
    addTaskToUser,
    removeFromTasks,
    DeleteTask
}