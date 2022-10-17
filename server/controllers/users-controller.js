const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const PORT = 5050;

// function for getting list of users
const getUsers = async (req, res, next) => {
    // res.json({ users: DUMMY_USERS })
    let users;
    try {
        users = await User.find({}, '-password'); // or '-password'
    } catch (err) {
        return next(new HttpError('Fetching users failed, please try again later.', 500))
    }
    res.json({ users: users.map(user => user.toObject({ getters: true })) })
}

// function for posting sign up users
const signUp = async (req, res, next) => {
    // const hasUser = DUMMY_USERS.find(user => user.email === email);
    // if (hasUser) {
    //     throw new HttpError('Could not create user, email already exists', 422)
    // }
    // const createdUser = {
    //     id: uuid(),
    //     name,
    //     email,
    //     password
    // }
    // DUMMY_USERS.push(createdUser);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }

    const { name, email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        return next(new HttpError('Signing up failed, please try again later.', 500))
    }

    if (existingUser) {
        return next(new HttpError('User exists already, please login instead', 422))
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return next(new HttpError('Could not create user, please try again.', 500))
    }



    const createdUser = new User({
        name,
        email,
        image: req.file.path,
        password: hashedPassword,
        places: []
    });

    try {
        await createdUser.save()
    } catch (err) {
        return next(new HttpError('Signing up failed, please try again', 500))
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
}

// function for posting logging in users
const logIn = async (req, res, next) => {
    const { email, password } = req.body;
    // const indetifiedUser = DUMMY_USERS.find(user => user.email === email);
    // if (!indetifiedUser || indetifiedUser.password === password) {
    //     throw new HttpError('Could not indentify user, credentials seem to be wrong', 401)
    // }

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        return next(new HttpError('Logging in failed, please try again later.', 500))
    }



    if (!existingUser) {
        return next(new HttpError('Invalid credentials, could not log you in.', 401))
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        return next(new HttpError('Could not log you in, please check you credentials and try again.', 500))
    }

    if (!isValidPassword) {
        return next(new HttpError('Invalid credentials, could not log you in.', 401))
    }

    res.json({
        message: 'Logged in',
        user: existingUser.toObject({ getters: true })
    })
}

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.logIn = logIn;