const mongoose = require('mongoose');
const path = process.cwd();
const Users = require(`${path}/schemas/usersSchema.js`);
const Task = require(`${path}/schemas/taskSchema.js`);
const Event = require(`${path}/schemas/eventSchema.js`);

const scheduleSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: [true, 'Schedule Name is required!'],
        trim: true,
        validate: {

            validator: function(v){
                return v.length >= 4;
            },
            message: 'Invalid Schedule Name!'
        }
    },
    tasks: [{
        type: String,
        ref: Task
    }],
    events: [{
        type: String,
        ref: Event
    }]

});

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;