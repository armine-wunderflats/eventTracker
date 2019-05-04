// Create your mongoose user schema here.
const mongoose = require('mongoose');
const pbkdf2 = require('pbkdf2');
const Schedule = require(`${path}/schemas/scheduleSchema.js`);

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
        required: [true, 'Email is required!'],
        trim: true
    },
    password: String,
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
        type: String,
        ref: Schedule
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
    console.log('looking for username');
    return Users.findOne({username}, {password: false});
}

UsersSchema.statics.findEmail = function(email){
    console.log('looking for password');
    return Users.findOne({email}, {password: false});
}

UsersSchema.statics.findUserForLogin = function(username){
    console.log('looking for username and password');
    return Users.findOne({username});
}

UsersSchema.statics.findSchedule = function(name){
    console.log('looking for schedule');
    return Users.findOne({schedules: {name}});
}


const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;