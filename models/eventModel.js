
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
            return;
        }
        await Users.findOneAndUpdate({username}, {$push: {events: event}});
        const user = await Users.findUsername(username);
        if(!user){
            throw new UserNotFound(username);
            return;
        }
        await event.save( function (err, event) {
            if(err){ 
                throw err; 
                return;
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
            return;
        }
        return event;
    }
    catch(error){
        throw new EventNotFound(name);
    }
}

async function getAllEvents() {
    try{
        console.log("getting all events");
        return await Event.find({});
    }
    catch(err){
        throw err;
    }
}
async function getAvailableEvents(username) {
    try{
        console.log("getting all events");
         if(!await Users.findUsername(username)){
            throw new UserNotFound(username);
            return;
        }
        const events = await Users.findMyEvents(username);
        const eventIds = events.events;
        return await Event.find({'_id':{$nin:eventIds}});
    }
    catch(err){
        throw err;
    }
}
async function getMyEvents(username) {
    try{
        console.log("getting my events")
        if(!await Users.findUsername(username)){
            throw new UserNotFound(username);
            return;
        }
        const events = await Users.findMyEvents(username);
        const eventIds = events.events;
        console.log(eventIds);
        return await Event.findEventsByIds(eventIds);
    }
    catch(err){
        throw err;
    }
}

async function addEventToUser(name, username) {
    console.log(`Sharing event ${name} with user ${username}`);
    try{
        if(!await Users.findUsername(username)){
            throw new UserNotFound(username);
            return;
        }
        const event = await Event.findEvent(name);
        if(!event){
            throw new EventNotFound(name);
            return;
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
        if(!event){
            throw new EventNotFound();
            return;
        }
        await Event.deleteOne({name});
        await Users.updateMany({events:event._id},{$pull:{events:event._id}});
        console.log(name + " event deleted!");
    }
    catch(error){
        throw error;
    }
}

async function removeFromEvents(_id, username) {
    console.log(`removing event ${_id} for user ${username}`);
     try{
        const event = await Event.findSingleEventById(_id);
        if(!event){
            throw new EventNotFound();
            return;
        }
        if(!await Users.findUsername(username)){
            throw new UserNotFound(username);
            return;
        }
        await Users.updateOne({username},{$pull:{events:_id}});
        console.log(_id + " event removed!");
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
    getAvailableEvents,
    addEventToUser,
    removeFromEvents,
    DeleteEvent
}