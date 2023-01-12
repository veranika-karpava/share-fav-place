const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const { dataUri } = require('../config/multerConfig');
const { uploader } = require('../config/cloudinaryConfig');
const JWT_KEY = process.env.JWT_SECRET_KEY;

// get list of users 
const getListUsers = async (_req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password'); // all data except password
    } catch (err) {
        return next(new HttpError('Fetching users failed, please try again later.', 500));
    }

    res.json({ users: users.map(user => user.toObject({ getters: true })) })
};

// for creating new user when sign up
const signUp = async (req, res, next) => {
    // validate input's data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    };

    const { name, email, password } = req.body;

    let existingUser;

    // check exciting user in database by email
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        return next(new HttpError('Signing up failed, please try again later.', 500));
    };

    if (existingUser) {
        return next(new HttpError('User exists already, please login.', 422));
    };

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return next(new HttpError('Could not create user, please try again.', 500));
    };

    // create new user
    let newUser;
    try {
        if (process.env.STORAGE_TYPE == "cloud") {
            const file = dataUri(req).content;
            const result = await uploader.upload(file);
            newUser = new User({
                name,
                email,
                image: result.secure_url,
                cloudinary_id: result.public_id,
                password: hashedPassword,
                places: []
            });
        } else {
            newUser = new User({
                name,
                email,
                image: req.file.path,
                cloudinary_id: null,
                password: hashedPassword,
                places: []
            });
        }
    } catch (err) { };

    // save in database
    try {
        await newUser.save()
    } catch (err) {
        return next(new HttpError('Signing up failed, please try again.', 500));
    }

    // generate jwt token
    let token;
    try {
        token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            JWT_KEY,
            { expiresIn: '1h' }
        );
    } catch (err) {
        return next(new HttpError('Signing up failed, please try again.', 500));
    }

    res.status(201).json({ userId: newUser.id, email: newUser.email, token: token });
}

// for login existing user
const logIn = async (req, res, next) => {

    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        return next(new HttpError('Logging in failed, please try again later.', 500));
    };

    if (!existingUser) {
        return next(new HttpError('Please check your username, could not log you in.', 403));
    };

    // check password
    let isValidPassword = false;

    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        return next(new HttpError('Could not log you in, please check you credentials and try again.', 500));
    };

    if (!isValidPassword) {
        return next(new HttpError('Please check your password, could not log you in.', 403));
    };

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

exports.getListUsers = getListUsers;
exports.signUp = signUp;
exports.logIn = logIn;