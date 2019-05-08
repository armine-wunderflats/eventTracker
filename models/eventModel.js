
const path = process.cwd();
const Event = require(`${path}/schemas/eventSchema.js`);
const Users = require(`${path}/schemas/usersSchema.js`);
const {
    UserNotFound,
    EventAlreadyExists,
    EventNotFound
} = require(`${path}/errors/errors.js`);

async function createEvent(event, username){
    console.log("createEvent function called");
    try{
        let name = event.name;
        if(await Event.findEvent(name)){
            throw new EventAlreadyExists(name);
        }
        await Users.findOneAndUpdate({username}, {$push: {events: event}});
        const user = await Users.findUsername(username);
        if(!user){
            throw new UserNotFound(username);
        }
        await event.save( function (err, event) {
            if(err){ 
                throw err; 
            }
            console.log(name + " event created!");
        });        
        console.log(event);
    }
    catch(err){
        throw err;
    }
}

async function getEvent(name) {
    try{
        console.log("getting event " + name);
        const event = await Event.findEvent(name);
        if(!event){
            throw new EventNotFound(name);
        }
        return event;
    }
    catch(error){
        throw new EventNotFound(name);
    }
}

async function getAllEvents() {
    console.log("getting all events");
    return await Event.find({});
}

async function getMyEvents(username) {
    console.log("getting my events");
    const user = await Users.findUsername(username);
    if(!user){
        throw new UserNotFound(username);
    }
    const events = await Users.findMyEvents(username);
    const eventIds = events.events;
    console.log(eventIds);
    return await Event.findEventsByIds(eventIds);
}

async function addEventToUser(name, username) {
    console.log(`Sharing event ${name} with user ${username}`);
    try{
        const user = await Users.findUsername(username);
        if(!user){
            throw new UserNotFound(username);
        }
        const event = await Event.findEvent(name);
        if(!event){
            throw new EventNotFound(name);
        }
        await Users.findOneAndUpdate({username}, {$push: {events: event}});

    }
    catch(err){
        throw err;
    }
}


async function DeleteEvent(name) {
    console.log("deleting event " + name);
     try{
        const event = await Event.findEvent(name);
        await Event.deleteOne({name});
        await Users.updateMany({events:event._id},{$pull:{events:event._id}});
        console.log(name + " event deleted!");
    }
    catch(error){
        throw new EventNotFound(name);
    }
}

module.exports = {
    createEvent,
    getEvent,
    getAllEvents,
    getMyEvents,
    addEventToUser,
    DeleteEvent
}