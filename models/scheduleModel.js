
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
        await Users.findOneAndUpdate({username}, {$push: {schedules: schedule}});
        const user = await Users.findUsername(username);
        if(!user){
            throw new UserNotFound(username);
        }
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
    console.log("getting all schedules");
    return await Schedule.find({});
}
async function deleteSchedule(name) {
    console.log("deleting schedule " + name);
     try{
        const schedule = await Schedule.findSchedule(name);
        await Schedule.deleteOne({name});
        await Users.updateMany({schedules:schedule._id},{$pull:{schedules:schedule._id}});
        console.log(name + " schedule deleted!");
    }
    catch(error){
        throw new ScheduleNotFound(name);
    }
}

module.exports = {
    createSchedule,
    getSchedule,
    getAllSchedules,
    deleteSchedule
}