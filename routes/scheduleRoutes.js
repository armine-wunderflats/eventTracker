const express = require('express');
const router = express.Router();
const path = process.cwd();

const Schedule = require(`${path}/schemas/scheduleSchema.js`);
const {
    createSchedule,
    getSchedule,
    getAllSchedules,
    getMySchedules,
    getAvailableSchedules,
    addScheduleToUser,
    removeFromSchedules,
    deleteSchedule
} = require(`${path}/models/scheduleModel.js`);

const {
    getUser
} = require(`${path}/models/usersModel.js`);

router.post('/', async function(req, res, next) {
    try{
        console.log('creating schedule...');
        const body = req.body;
        const schedule = new Schedule({
            name: body.name,
            description: body.description
        });
        await createSchedule(schedule, body.username);
        res.status(200).send('schedule created!').end();
    }
    catch(err){
        next(err);
    }
})

router.get('/', async function(req, res, next){
    try{
        res.json(await getAllSchedules());
    }
    catch(err){
        next(err);
    }
})

router.get('/all/:username', async function(req, res, next){
    try{
        res.json(await getAvailableSchedules(req.params.username));
    }
    catch(err){
        next(err);
    }
})

router.get('/user/:username', async function(req, res, next){
    try{
        res.json(await getMySchedules(req.params.username));
    }
    catch(err){
        next(err);
    }
})
router.post('/add', async function(req, res, next){
    try{
        console.log('adding schedule to user...');
        const body = req.body;
        await addScheduleToUser(body.schedulename, body.username);
        res.status(200).send('schedule added to user!').end();
    }
    catch(err){
        next(err);
    }
})
router.get('/:name', async function(req, res, next){
    try{
        res.json(await getSchedule(req.params.name));
    }
    catch(err){
        next(err);
    }
})

router.post('/delete', async function(req, res, next){
    try{
        console.log('deleting schedule...');
        const body = req.body;
        await deleteSchedule(body.name);
        res.status(200).send('schedule deleted!').end();
    }
    catch(err){
        next(err);
    }
})
router.post('/remove', async function(req, res, next){
    try{
        console.log('removing schedule...');
        const body = req.body;
        await removeFromSchedules(body.scheduleId, body.username);
        res.status(200).send('schedule removed!').end();
    }
    catch(err){
        next(err);
    }
})
module.exports = router;