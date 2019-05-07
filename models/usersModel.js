const path = process.cwd();
const Users = require(`${path}/schemas/usersSchema.js`);
const {
    UserNotFound,
    UserAlreadyExists,
    PasswordIncorrect,
    ValidationError,
    UserIsLocked 
} = require(`${path}/errors/errors.js`);

async function login(username, password) {
    // if the user is not found, throw UserNotFound error.
    // if the passwords do not match, throw PasswordIncorrect error.
    let user;
    try {
        user =await Users.findUserForLogin(username);
        console.log("found user: ");
        console.log(user);
    }
    catch(error){
        throw new UserNotFound;
    }

    if(user.locked) {
        throw new UserIsLocked;
    }   

    if(!user.comparePasswords(password)) {
        let count = user.failedLoginCount;
        count++;
        await Users.findOneAndUpdate({username}, { $set: {failedLoginCount: count}});
        if(count >= 3) {
            await Users.findOneAndUpdate({username}, { $set: {locked: true}});
            throw new UserIsLocked;
        }

        throw new PasswordIncorrect();
    }
    
    await Users.findOneAndUpdate({username},{ $set: {failedLoginCount: 0}});

}

async function getUser(username) {
    // Call corresponding schema function to retrieve the user and return the result.
    // if the user is not found, throw UserNotFound error.
    try{
        console.log("getting user " + username);
        const user = await Users.findUsername(username);
        if(!user){
            throw new UserNotFound(username);
        }
        return user;
    }
    catch(error){
        throw new UserNotFound(username);
    }
}

async function getAllUsers() {
    // Call corresponding schema function to retrieve all users and return the result.
    console.log("getting all users");
    return await Users.find({}, {password: false});
}

async function createUser(user) {
    // Call corresponding schema function to create a user.
    // If the user already exists mongoose should throw an error.
    // Catch that error here and throw UserAlreadyExists error instead.
    console.log("createUser function called");
    try{
        let username = user.username;
        let email = user.email;
        if(username.length < 4){
            throw new ValidationError();
        }
        if(await Users.findUsername(username) || await Users.findEmail(email)){
            console.log("got result");
            throw new UserAlreadyExists(username);
        }
        await user.save( function (err, user) {
            if(err){ 
                throw err; 
            }
            console.log(username + " user created!");
        });
        console.log(user);
    }
    catch(err){
        throw err;
    }
}

module.exports = {
    login,
    getUser,
    getAllUsers,
    createUser
}
