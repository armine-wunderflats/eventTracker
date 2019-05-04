const mongoose = require('mongoose');
const path = process.cwd();
const Users = require(`${path}/schemas/usersSchema.js`);

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: [true, 'Event Name is required!'],
        trim: true,
        validate: {
            validator: function(v){
                return v.length >= 4;
            },
            message: 'Invalid Event Name!'
        }
    },
    host: {
        type: String,
        ref: Users
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

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;