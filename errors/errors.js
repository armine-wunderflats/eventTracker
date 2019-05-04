
class UserNotFound extends Error {
    constructor() {
        super(`User was not found!`);
    }
}

class UserAlreadyExists extends Error {
    constructor() {
        super(`User already exists!`);
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



module.exports = {
    UserNotFound,
    UserAlreadyExists,
    PasswordIncorrect,
    ValidationError, // Username is shorter than 4 characters
    UserIsLocked // BONUS
}
