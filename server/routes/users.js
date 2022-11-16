const express = require('express');
// import check method from express-validator
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controller');
const { fileUpload } = require('../config/multerConfig');
const { cloudinaryConfig } = require('../config/cloudinaryConfig');

// create router
const usersRouter = express.Router();

// retrivere list of users
usersRouter.get('/', usersControllers.getUsers);

// route for sign up
//.single(fieldname)  - accept a single file with the name fieldname. The single file will be stored in req.file.
usersRouter.post('/signup', cloudinaryConfig, fileUpload, [check('name').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').isLength({ min: 6 })], usersControllers.signUp);

//route for log in
usersRouter.post('/login', usersControllers.logIn);

module.exports = usersRouter;