const mongoose = require('mongoose');
const path = process.cwd();
const Users = require(`${path}/schemas/usersSchema.js`);

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Event Name is required!'],
        trim: true,
        unique: true
    },
    host: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    date: Date,
    reminder: Date,
    venue: String,
    price: String,
    description: String

});


eventSchema.statics.findEvent = function(name){
    console.log(`looking for event ${name}`);
    return Event.findOne({name});
}

eventSchema.statics.findEventsByIds = function(eventIds){
    console.log(`looking for event list`);
    return Event.find({ '_id': { $in : eventIds } });
}

eventSchema.statics.findSingleEventById = function(_id){
    console.log(`looking for event ${_id}`);
    return Event.find({ _id });
}
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;