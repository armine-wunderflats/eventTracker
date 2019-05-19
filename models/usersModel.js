const path = process.cwd();
const Users = require(`${path}/schemas/usersSchema.js`);
const {
    UserNotFound,
    UserAlreadyExists,
    UsernameAndPasswordMustBeProvided,
    PasswordIncorrect,
    ValidationError,
    UserIsLocked 
} = require(`${path}/errors/errors.js`);

async function login(username, password) {
    let user;
    if(!password || !username){
        throw new UsernameAndPasswordMustBeProvided();
    }
    try {
        user =await Users.findUserForLogin(username);
        if(!user){
            throw new UserNotFound(username);
        }
        console.log("found user: ");
        console.log(user);
    }
    catch(error){
        throw error;
    }

    if(user.locked) {
        throw new UserIsLocked(username);
    }   

    if(!user.comparePasswords(password)) {
        try{

            let count = user.failedLoginCount;
            count++;
            await Users.findOneAndUpdate({username}, { $set: {failedLoginCount: count}});
            if(count >= 3) {
                await Users.findOneAndUpdate({username}, { $set: {locked: true}});
                throw new UserIsLocked(username);
                return;
            }
        }
        catch(error){
            throw error;
        }

        throw new PasswordIncorrect();
    }
    
    await Users.findOneAndUpdate({username},{ $set: {failedLoginCount: 0}});

}

async function getUser(username) {
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

async function getUserById(_id) {
    try{
        console.log("getting user " + _id);
        const user = await Users.findUserById(_id);
        if(!user){
            throw new UserNotFound(_id);
        }
        return user;
    }
    catch(error){
        throw new UserNotFound(_id);
    }
}

async function getAllUsers() {
    console.log("getting all users");
    try{
        return await Users.find({}, {password: false});
    }
    catch(err){
        throw err;
    }
}

async function createUser(user) {
    console.log("createUser function called");
    try{
        let username = user.username;
        let email = user.email;
        if(!username || !user.password){
            throw new UsernameAndPasswordMustBeProvided();
        }
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
                return;
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
    getUserById,
    createUser
}
