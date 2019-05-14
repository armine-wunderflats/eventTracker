// Define routes of /users/ api here
const express = require('express');
const router = express.Router();
const path = process.cwd();

const Users = require(`${path}/schemas/usersSchema.js`);
const {
    login,
    getUser,
    getAllUsers,
    getUserById,
    createUser
} = require(`${path}/models/usersModel.js`);

router.post('/', async function(req, res, next) {
    try{
        console.log('creating user...');
        const body = req.body;
        const user = new Users({
            username: body.username, 
            password: body.password, 
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName
        });
        await createUser(user);
        const socketio = req.app.get('socketio');
        socketio.emit('user-created', user);
        res.status(200).send('user created!').end();
    }
    catch(err){
        next(err);
    }
})

router.get('/', async function(req, res, next){
    try{
        res.json(await getAllUsers());
    }
    catch(err){
        next(err);
    }
})

router.get('/:username', async function(req, res, next){
    try{
        res.json(await getUser(req.params.username));
    }
    catch(err){
        next(err);
    }
})

router.get('/id/:_id', async function(req, res, next){
    try{
        res.json(await getUserById(req.params._id));
    }
    catch(err){
        next(err);
    }
})

module.exports = router;