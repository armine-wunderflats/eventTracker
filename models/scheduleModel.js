
// getSchedule (scheduleName)
// getAllSchedules()
// deleteSchedule(ScheduleName)

const path = process.cwd();
const {
    UserNotFound,
    ScheduleAlreadyExists,
    ScheduleNotFound
} = require(`${path}/errors/errors.js`);
const Users = require(`${path}/schemas/usersSchema.js`);
const Schedule = require(`${path}/schemas/scheduleSchema.js`);

async function createSchedule(schedule, username){
    console.log("createSchedule function called");
    try{
        let name = schedule.name;
        if(await Schedule.findSchedule(name)){
            throw new ScheduleAlreadyExists();
        }
        if(!await Users.findUsername(username)){
            throw new UserNotFound(username);
        }
        await Users.findOneAndUpdate({username}, {$push: {schedules: schedule}});
        await schedule.save( function (err, schedule) {
            if(err){ 
                throw err; 
            }
            console.log(name + " schedule created!");
        });
        console.log(schedule);
    }
    catch(err){
        throw err;
    }
}
async function getSchedule(name) {
    try{
        console.log("getting schedule " + name);
        const schedule = await Schedule.findSchedule(name);
        if(!schedule){
            throw new ScheduleNotFound(name);
        }
        return schedule;
    }
    catch(error){
        throw new ScheduleNotFound(name);
    }
}
async function getAllSchedules() {
    try{
        console.log("getting all schedules");
        return await Schedule.find({});
    }
    catch(err){
        throw err;
    }
}
async function getMySchedules(username) {
    console.log("getting my schedules");
    try{
        if(!await Users.findUsername(username)){
            throw new UserNotFound(username);
        }
        const schedules = await Users.findMySchedules(username);
        const scheduleIds = schedules.schedules;
        return await Schedule.find({ '_id': { $in : scheduleIds }} );
    }
    catch(err){
        throw err;
    }
}
async function getAvailableSchedules(username) {
    console.log("getting all schedules");
    try{
        if(!await Users.findUsername(username)){
            throw new UserNotFound(username);
        }
        const schedules = await Users.findMySchedules(username);
        const scheduleIds = schedules.schedules;
        return await Schedule.find({'_id':{$nin:scheduleIds}});
    }
    catch(err){
        throw err;
    }
}
async function addScheduleToUser(name, username) {
    console.log(`Sharing schedule ${name} with user ${username}`);
    try{
        if(!await Users.findUsername(username)){
            throw new UserNotFound(username);
        }
        const schedule = await Schedule.findSchedule(name);
        if(!schedule){
            throw new ScheduleNotFound(name);
        }
        await Users.findOneAndUpdate({username}, {$push: {schedules: schedule}});

    }
    catch(err){
        throw err;
    }
}
async function deleteSchedule(name) {
    console.log("deleting schedule " + name);
     try{
        const schedule = await Schedule.findSchedule(name);
        if(!schedule){
            throw new ScheduleNotFound(name);
        }
        await Schedule.deleteOne({name});
        await Users.updateMany({schedules:schedule._id},{$pull:{schedules:schedule._id}});
        console.log(name + " schedule deleted!");
    }
    catch(error){
        throw new ScheduleNotFound(name);
    }
}
async function removeFromSchedules(_id, username) {
    console.log(`removing schedule ${_id} for user ${username}`);
     try{
        const schedule = await Schedule.findScheduleById(_id);
        if(!schedule){
            throw new ScheduleNotFound(_id);
        }
        if(!await Users.findUsername(username)){
            throw new UserNotFound(username);
        }
        await Users.updateOne({username},{$pull:{schedules:_id}});
        console.log(_id + " schedule deleted!");
    }
    catch(error){
        throw new ScheduleNotFound(_id);
    }
}

module.exports = {
    createSchedule,
    getSchedule,
    getAllSchedules,
    getMySchedules,
    getAvailableSchedules,
    addScheduleToUser,
    removeFromSchedules,
    deleteSchedule
}