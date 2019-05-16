const express = require('express');
const app = express();
const path = process.cwd();

const http = require('http').Server(app);
const socketio = require('socket.io')(http);
app.set('socketio', socketio);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/users', require(`${path}/routes/usersRoutes.js`));
app.use('/tasks', require(`${path}/routes/taskRoutes.js`));
app.use('/events', require(`${path}/routes/eventRoutes.js`));
app.use('/schedules', require(`${path}/routes/scheduleRoutes.js`));

const {
    UserNotFound,
    UserAlreadyExists,
    PasswordIncorrect,
    UsernameAndPasswordMustBeProvided,
    EventAlreadyExists,
    TaskAlreadyExists,
    ScheduleAlreadyExists,
    EventNotFound,
    TaskNotFound,
    ScheduleNotFound,
    ValidationError, 
    UserIsLocked 
}  = require(`${path}/errors/errors.js`);

const {
    login,
    getUser,
    getAllUsers,
    createUser
} = require(`${path}/models/usersModel.js`);


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.post('/login', async function(req, res, next) {
  try{
    const body = req.body;
    console.log(body);
    await login(body.username, body.password);
    const socketio = req.app.get('socketio');
    socketio.emit('login-successful', body);
    res.status(200).send('login successful');
  }
  catch(err){
    next(err);
    const socketio = req.app.get('socketio');
    socketio.emit('login-error');
  }

});

app.use(function (err, req, res, next) {

  console.log("checking error type");
  if(err instanceof UserNotFound){
    socketio.emit('error', err.message);
    res.status(404).send("The requested user was not found!").end();
    return;
  }
  if(err instanceof EventNotFound){
    socketio.emit('error', err.message);
    res.status(404).send("The requested event was not found!").end();
    return;
  }
  if(err instanceof TaskNotFound){
    socketio.emit('error', err.message);
    res.status(404).send("The requested task was not found!").end();
    return;
  }
  if(err instanceof ScheduleNotFound){
    socketio.emit('error', err.message);
    res.status(404).send("The requested schedule was not found!").end();
    return;
  }
  if(err instanceof UserAlreadyExists){
    socketio.emit('error', err.message);
    res.status(409).send("A user with that username or email already exists!").end();
    return;
  }
  if(err instanceof EventAlreadyExists){
    socketio.emit('error', err.message);
    res.status(409).send("An event with that name already exists!").end();
    return;
  }
  if(err instanceof TaskAlreadyExists){
    socketio.emit('error', err.message);
    res.status(409).send("A task with that name already exists!").end();
    return;
  }
  if(err instanceof ScheduleAlreadyExists){
    socketio.emit('error', err.message);
    res.status(409).send("A schedule with that name already exists!").end();
    return;
  }
  if(err instanceof PasswordIncorrect){
    socketio.emit('error', err.message);
    res.status(401).send("The password you entered is incorrect!").end();
    return;
  }
  if(err instanceof UsernameAndPasswordMustBeProvided){
    socketio.emit('error', err.message);
    res.status(400).send("You are missing your username or password!").end();
    return;
  }
  if(err instanceof ValidationError){
    socketio.emit('error', err.message);
    res.status(400).send("The username you entered is not valid!").end();
    return;
  }
  if(err instanceof UserIsLocked){
    socketio.emit('error', err.message);
    res.status(423).send("You exceeded the maximum login attempts! The user is locked!").end();
    return;
  }
  // If the error is not known
  console.error(err.stack);
  socketio.emit('error', err.message);
  res.status(500).end();
}); 

socketio.on('connect', function() {
    console.log('someone connected');
})


http.listen(3000, function() {
    console.log('server is up and running...');
});