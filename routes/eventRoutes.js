const express = require('express');
const router = express.Router();
const path = process.cwd();

const Event = require(`${path}/schemas/eventSchema.js`);
const {
    createEvent,
    getEvent,
    getAllEvents,
    getMyEvents,
    getAvailableEvents,
    addEventToUser,
    removeFromEvents,
    DeleteEvent
} = require(`${path}/models/eventModel.js`);

const { DateNotValid } = require(`${path}/errors/errors.js`);
const {
    getUser
} = require(`${path}/models/usersModel.js`);

router.post('/', async function(req, res, next) {
    try{
        console.log('creating event...');
        const body = req.body;
        const host = await getUser(body.host);
        let date='';
        if(body.date){
            date = Date.parse(body.date);
            if(!date){
                throw new DateNotValid('date');
            }
        }
        let reminder = '';
        if(body.reminder){
            reminder = Date.parse(body.reminder);
            if(!reminder){
                throw new DateNotValid('reminder');
            }
        }
        const event = new Event({
            name: body.name,
            host: host,
            date: date,
            reminder: reminder,
            venue: body.venue,
            price: body.price,
            description: body.description
        });
        await createEvent(event, body.host);
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

router.get('/all/user/:username', async function(req, res, next){
    try{
        res.json(await getAvailableEvents(req.params.username));
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

router.get('/user/:username', async function(req, res, next){
    try{
        res.json(await getMyEvents(req.params.username));
    }
    catch(err){
        next(err);
    }
})

router.post('/add', async function(req, res, next){
    try{
        console.log('adding event to user...');
        const body = req.body;
        await addEventToUser(body.eventname, body.username);
        res.status(200).send('event added to user!').end();
    }
    catch(err){
        next(err);
    }
})
router.post('/delete', async function(req, res, next){
    try{
        console.log('deleting event...');
        const body = req.body;
        await DeleteEvent(body.name);
        res.status(200).send('event deleted!').end();
    }
    catch(err){
        next(err);
    }
})
router.post('/remove', async function(req, res, next){
    try{
        console.log('removing event...');
        const body = req.body;
        await removeFromEvents(body.eventId, body.username);
        res.status(200).send('event removed!').end();
    }
    catch(err){
        next(err);
    }
})
module.exports = router;