const mongoose = require('mongoose');
const path = process.cwd();

const scheduleSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: [true, 'Schedule Name is required!'],
        trim: true,
        unique: true
    },
    description: String

});

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;