
class UserNotFound extends Error {
    constructor(username) {
        super(`User ${username} was not found!`);
    }
}

class UsernameAndPasswordMustBeProvided extends Error {
    constructor() {
        super('Both username and password must be provided!');
    }
}

class UsernameMustBeProvided extends Error {
    constructor() {
        super('Both username must be provided!');
    }
}

class UserAlreadyExists extends Error {
    constructor(username) {
        super(`User ${username} already exists!`);
    }
}
class PasswordIncorrect extends Error {
    constructor() {
        super('The provided password is wrong!');
    }
}
class ValidationError extends Error {
    constructor() {
        super('Validation Error! Username must be at least 4 characters.');
    }
}
class UserIsLocked extends Error {
    constructor(username) {
        super(`The provided passport is wrong! User ${username} now is locked!`);
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
        super(`Event ${name} was not found!`);
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
    UsernameAndPasswordMustBeProvided,
    UsernameMustBeProvided,
    EventAlreadyExists,
    TaskAlreadyExists,
    ScheduleAlreadyExists,
    EventNotFound,
    TaskNotFound,
    ScheduleNotFound,
    ValidationError, 
    UserIsLocked 
}
