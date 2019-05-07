
class UserNotFound extends Error {
    constructor(username) {
        super(`User ${username} was not found!`);
    }
}

class UserAlreadyExists extends Error {
    constructor(username) {
        super(`User ${username} already exists!`);
    }
}
class PasswordIncorrect extends Error {
    constructor() {
        super('Password is wrong!');
    }
}
class ValidationError extends Error {
    constructor() {
        super('Validation Error!');
    }
}
class UserIsLocked extends Error {
    constructor() {
        super(`User is locked!`);
    }
}
class EventAlreadyExists extends Error {
    constructor(name) {
        super(`Event ${name} Already Exists!`);
    }
}
class TaskAlreadyExists extends Error {
    constructor(name) {
        super(`Task ${name} Already Exists!`);
    }
}
class ScheduleAlreadyExists extends Error {
    constructor(name) {
        super(`Schedule ${name} Already Exists!`);
    }
}
class EventNotFound extends Error {
    constructor(name) {
        super(`Event ${name}  was not found!`);
    }
}
class TaskNotFound extends Error {
    constructor(name) {
        super(`Task ${name} was not found!`);
    }
}
class ScheduleNotFound extends Error {
    constructor(name) {
        super(`Schedule ${name} was not found!`);
    }
}



module.exports = {
    UserNotFound,
    UserAlreadyExists,
    PasswordIncorrect,
    EventAlreadyExists,
    TaskAlreadyExists,
    ScheduleAlreadyExists,
    EventNotFound,
    TaskNotFound,
    ScheduleNotFound,
    ValidationError, // Username is shorter than 4 characters
    UserIsLocked // BONUS
}
