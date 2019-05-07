const mongoose = require('mongoose');
const path = process.cwd();
const Users = require(`${path}/schemas/usersSchema.js`);

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: [true, 'Event Name is required!'],
        trim: true,
        unique: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    date: {
        type: Date,
        required: [true, 'Event Date is required!'],
    },
    reminder: Date,
    venue: String,
    price: String,
    description: String

});


eventSchema.statics.findEvent = function(name){
    console.log('looking for event name');
    return Event.findOne({name});
}

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;