// Create your mongoose user schema here.
const path = process.cwd();
const mongoose = require('mongoose');
const pbkdf2 = require('pbkdf2');
const Schedule = require(`${path}/schemas/scheduleSchema.js`);
const Task = require(`${path}/schemas/taskSchema.js`);
const Event = require(`${path}/schemas/eventSchema.js`);

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Username is required!'],
        trim: true,
        validate: {
            validator: function(v){
                return v.length >= 4;
            },
            message: 'Invalid Username!'
        }
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type:String,
        required: [true, 'Password is required!']
    },
    firstName:  {
        type: String,
        trim: true
    },
    lastName:  {
        type: String,
        trim: true
    },
    failedLoginCount: {
        type: Number,
        default: 0
    },
    locked: {
        type: Boolean,
        default: false
    },
    schedules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]

});

UsersSchema.pre('save', function(next){
    console.log('encrypting password');
    this.password = pbkdf2.pbkdf2Sync(this.password, 'salt', 1, 32, 'sha512').toString('hex');
    next();
});

UsersSchema.methods.comparePasswords = function(pass){
    console.log('comparing passwords');
    return this.password === pbkdf2.pbkdf2Sync(pass, 'salt', 1, 32, 'sha512').toString('hex');
}

UsersSchema.statics.findUsername = function(username){
    console.log(`looking for user ${username}`);
    return Users.findOne({username}, {password: false});
}

UsersSchema.statics.findUserById = function(_id){
    console.log(`looking for user ${_id}`);
    return Users.findOne({_id}, {password: false});
}

UsersSchema.statics.findEmail = function(email){
    console.log(`looking for email ${email}`);
    return Users.findOne({email}, {password: false});
}

UsersSchema.statics.findUserForLogin = function(username){
    console.log('looking for username and password');
    return Users.findOne({username});
}
UsersSchema.statics.findMySchedules = function(username){
    console.log(`looking for schedules for ${username}`);
    return Users.findOne({username}, {schedules: true});
}
UsersSchema.statics.findMyEvents = function(username){
    console.log(`looking for events for ${username}`);
    return Users.findOne({username}, {events: true});
}
UsersSchema.statics.findMyTasks = function(username){
    console.log(`looking for tasks for ${username}`);
    return Users.findOne({username}, {tasks: true});
}

const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;