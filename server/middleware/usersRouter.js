const express = require('express');
const { check } = require('express-validator');

const { getListUsers, signUp, logIn } = require('../services/usersService');
const { fileUpload } = require('../config/multerConfig');
const { cloudinaryConfig } = require('../config/cloudinaryConfig');

// create router
const usersRouter = express.Router();

// get a list of users
usersRouter.get('/', getListUsers);

// for signing up
usersRouter.post('/signup', cloudinaryConfig, fileUpload, [check('name').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').isLength({ min: 6 })], signUp);

//for loging in
usersRouter.post('/login', logIn);

module.exports = usersRouter;