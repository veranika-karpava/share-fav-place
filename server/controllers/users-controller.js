const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const { dataUri } = require('../config/multerConfig');
const { uploader } = require('../config/cloudinaryConfig');
const JWT_KEY = process.env.JWT_SECRET_KEY;

// get list of users 
const getUsers = async (req, res, next) => {
    let users;
    // get list of users from database
    try {
        users = await User.find({}, '-password'); // get all data except password
    } catch (err) {
        return next(new HttpError('Fetching users failed, please try again later.', 500));
    }

    res.json({ users: users.map(user => user.toObject({ getters: true })) })
}

// sign up (created new user)
const signUp = async (req, res, next) => {
    // check inputs data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    };

    // get data from post request
    const { name, email, password } = req.body;

    let existingUser;

    // check exciting user in database using email
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        return next(new HttpError('Signing up failed, please try again later.', 500));
    }

    if (existingUser) {
        return next(new HttpError('User exists already, please login.', 422));
    }

    // hashed password
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return next(new HttpError('Could not create user, please try again.', 500));
    }

    // create new user
    let createdUser;
    try {
        if (process.env.STORAGE_TYPE == "cloud") {
            const file = dataUri(req).content;
            const result = await uploader.upload(file);
            createdUser = new User({
                name,
                email,
                image: result.secure_url,
                cloudinary_id: result.public_id,
                password: hashedPassword,
                places: []
            });
        } else {
            createdUser = new User({
                name,
                email,
                image: req.file.path,
                cloudinary_id: null,
                password: hashedPassword,
                places: []
            });
        }
    } catch (err) { }

    // save in database
    try {
        await createdUser.save()
    } catch (err) {
        return next(new HttpError('Signing up failed, please try again.', 500));
    }

    // generate jwt token
    let token;
    try {
        token = jwt.sign(
            { userId: createdUser.id, email: createdUser.email },
            JWT_KEY,
            { expiresIn: '1h' }
        );
    } catch (err) {
        return next(new HttpError('Signing up failed, please try again.', 500));
    }

    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
}

// log in user
const logIn = async (req, res, next) => {
    // data from post request
    const { email, password } = req.body;

    let existingUser;
    // check user exists or not using email
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        return next(new HttpError('Logging in failed, please try again later.', 500));
    }
    if (!existingUser) {
        return next(new HttpError('Please check your username, could not log you in.', 403));
    }

    // check password
    let isValidPassword = false;

    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        return next(new HttpError('Could not log you in, please check you credentials and try again.', 500));
    }

    if (!isValidPassword) {
        return next(new HttpError('Please check your password, could not log you in.', 403));
    }

    // generate jwt token
    let token;
    try {
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            JWT_KEY,
            { expiresIn: '1h' }
        );
    } catch (err) {
        return next(new HttpError('Logging in failed, please try again', 500));
    }

    res.json({
        userId: existingUser.id,
        email: existingUser.email,
        token: token
    });
}

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.logIn = logIn;