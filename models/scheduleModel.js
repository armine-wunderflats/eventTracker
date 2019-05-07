
// getSchedule (sheduleName)
// getAllSchedules()
// deleteSchedule(ScheduleName)

const path = process.cwd();
const {
    UserNotFound,
    ScheduleAlreadyExists,
    ScheduleNotFound
} = require(`${path}/errors/errors.js`);

async function createSchedule(shedule, username){
    console.log("createSchedule function called");
    try{
        let name = shedule.name;
        if(await Schedule.findSchedule(name)){
            throw new ScheduleAlreadyExists();
        }
        const user = await Users.findUsername(username);
        if(!user){
            throw new UserNotFound(username);
        }
        await shedule.save( function (err, shedule) {
            if(err){ 
                throw err; 
            }
            console.log(name + " shedule created!");
        });
        await Users.find({username}, { $push: { shedules: shedule } });
        console.log(shedule);
    }
    catch(err){
        throw err;
    }
}
async function getShedule(name) {
    try{
        console.log("getting shedule " + name);
        const shedule = await Shedule.findShedule(name);
        if(!shedule){
            throw new SheduleNotFound(name);
        }
        return shedule;
    }
    catch(error){
        throw new SheduleNotFound(name);
    }
}
async function getAllShedules() {
    console.log("getting all shedules");
    return await Shedule.find({});
}
async function DeleteShedule(name) {
    console.log("deleting shedule " + name);
     try{
        await Shedule.findShedule(name).remove().exec();
        console.log(name + " shedule deleted!");
    }
    catch(error){
        throw new SheduleNotFound(name);
    }
}

module.exports = {
    createShedule,
    getShedule,
    getAllShedules,
    deleteSchedule
}