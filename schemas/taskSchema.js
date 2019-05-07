const mongoose = require('mongoose');
const path = process.cwd();
const Users = require(`${path}/schemas/usersSchema.js`);

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: [true, 'Task Name is required!'],
        trim: true,
        unique: true,
        validate: {
            validator: function(v){
                return v.length >= 4;
            },
            message: 'Invalid Task Name!'
        }
    },
    deadline: Date,
    reminder: Date,
    location: String,
    description: String
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;