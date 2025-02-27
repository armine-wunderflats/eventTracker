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
scheduleSchema.statics.findSchedule = function(name){
    console.log(`looking for shedule ${name}`);
    return Schedule.findOne({name});
}
scheduleSchema.statics.findScheduleById = function(_id){
    console.log(`looking for shedule ${_id}`);
    return Schedule.findOne({_id});
}


const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;