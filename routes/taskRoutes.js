const express = require('express');
const router = express.Router();
const path = process.cwd();

const Task = require(`${path}/schemas/taskSchema.js`);
const {
    createTask,
    getTask,
    getAllTasks,
    getMyTasks,
    getAvailableTasks,
    addTaskToUser,
    removeFromTasks,
    DeleteTask
} = require(`${path}/models/taskModel.js`);
const { DateNotValid } = require(`${path}/errors/errors.js`);

const {
    getUser
} = require(`${path}/models/usersModel.js`);

router.post('/', async function(req, res, next) {
    try{
        console.log('creating task...');
        const body = req.body;
        let deadline='';
        if(body.deadline){
            deadline = Date.parse(body.deadline);
            if(!deadline){
                throw new DateNotValid('deadline');
            }
        }
        let reminder = '';
        if(body.reminder){
            reminder = Date.parse(body.reminder);
            if(!reminder){
                throw new DateNotValid('reminder');
            }
        }
        const task = new Task({
            name: body.name,
            deadline: deadline,
            reminder: reminder,
            location: body.location,
            description: body.description
        });
        await createTask(task, body.username);
        res.status(200).send('task created!').end();
    }
    catch(err){
        next(err);
    }
})


router.get('/', async function(req, res, next){
    try{
        res.json(await getAllTasks());
    }
    catch(err){
        next(err);
    }
})

router.get('/all/user/:username', async function(req, res, next){
    try{
        res.json(await getAvailableTasks(req.params.username));
    }
    catch(err){
        next(err);
    }
})


router.get('/:name', async function(req, res, next){
    try{
        res.json(await getTask(req.params.name));
    }
    catch(err){
        next(err);
    }
})

router.get('/user/:username', async function(req, res, next){
    try{
        res.json(await getMyTasks(req.params.username));
    }
    catch(err){
        next(err);
    }
})

router.post('/add', async function(req, res, next){
    try{
        console.log('adding task to user...');
        const body = req.body;
        await addTaskToUser(body.taskname, body.username);
        res.status(200).send('task added to user!').end();
    }
    catch(err){
        next(err);
    }
})
router.post('/delete', async function(req, res, next){
    try{
        console.log('deleting task...');
        const body = req.body;
        await DeleteTask(body.name);
        res.status(200).send('task deleted!').end();
    }
    catch(err){
        next(err);
    }
})
router.post('/remove', async function(req, res, next){
    try{
        console.log('removing task...');
        const body = req.body;
        await removeFromTasks(body.taskId, body.username);
        res.status(200).send('task removed!').end();
    }
    catch(err){
        next(err);
    }
})
module.exports = router;