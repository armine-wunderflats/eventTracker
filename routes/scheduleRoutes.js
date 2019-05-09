const express = require('express');
const router = express.Router();
const path = process.cwd();

const Schedule = require(`${path}/schemas/scheduleSchema.js`);
const {
    createSchedule,
    getSchedule,
    getAllSchedules,
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
module.exports = router;