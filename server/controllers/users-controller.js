const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
        id: "u1",
        name: "Veranika Karpava",
        email: "test@test.com",
        password: "testers"
    }
]


const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS })
}

const signUp = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data', 422);
    }

    const { name, email, password } = req.body;
    const hasUser = DUMMY_USERS.find(user => user.email === email);
    if (hasUser) {
        throw new HttpError('Could not create user, email already exists', 422)
    }

    const createdUser = {
        id: uuid(),
        name,
        email,
        password
    }

    DUMMY_USERS.push(createdUser);

    res.status(201).json({ user: createdUser })
}

const logIn = (req, res, next) => {
    const { email, password } = req.body;

    const indetifiedUser = DUMMY_USERS.find(user => user.email === email);
    if (!indetifiedUser || indetifiedUser.password === password) {
        throw new HttpError('Could not indentify user, credentials seem to be wrong', 401)
    }

    res.json({ message: 'Logged in' })
}

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.logIn = logIn;