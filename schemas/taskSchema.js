const mongoose = require('mongoose');
const path = process.cwd();
const Users = require(`${path}/schemas/usersSchema.js`);

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Task Name is required!'],
        trim: true,
        unique: true
    },
    deadline: Date,
    reminder: Date,
    location: String,
    description: String
});

taskSchema.statics.findTask = function(name){
    console.log(`looking for task ${name}`);
    return Task.findOne({name});
}

taskSchema.statics.findTasksByIds = function(taskIds){
    console.log(`looking for task list`);
    return Task.find({ '_id': { $in : taskIds } });
}

taskSchema.statics.findSingleTaskById = function(_id){
    console.log(`looking for task ${_id}`);
    return Task.find({ _id });
}

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;