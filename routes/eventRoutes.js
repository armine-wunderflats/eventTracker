const express = require('express');
const router = express.Router();
const path = process.cwd();

const event = require(`${path}/schemas/eventSchema.js`);
const {
    createEvent,
    getEvent,
    getAllEvents,
    getMyEvents,
    addEventToUser,
    DeleteEvent
} = require(`${path}/models/eventModel.js`);

const {
    getUser
} = require(`${path}/models/usersModel.js`);

router.post('/', async function(req, res, next) {
    try{
        console.log('creating event...');
        const body = req.body;
        const host = await getUser(body.host);
        const date = new Date(body.date);
        const reminder = new Date(body.reminder);
        console.log(req.body);
        const event = new Users({
            name: body.name,
            host: host,
            date: date,
            reminder: reminder,
            venue: body.venue,
            price: body.price,
            description: body.description
        });
        await createEvent(event);
        res.status(200).send('event created!').end();
    }
    catch(err){
        next(err);
    }
})


router.get('/', async function(req, res, next){
    try{
        res.json(await getAllEvents());
    }
    catch(err){
        next(err);
    }
})
router.get('/:name', async function(req, res, next){
    try{
        res.json(await getEvent(req.params.name));
    }
    catch(err){
        next(err);
    }
})
module.exports = router;