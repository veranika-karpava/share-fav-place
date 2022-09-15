const express = require('express');
const { check } = require('express-validator')// import check method from express-validator

// import controller
const usersControllers = require('../controllers/users-controller');



// create our router
const usersRouter = express.Router();

// retrivere list of users
usersRouter.get('/', usersControllers.getUsers);

// route for sign up
usersRouter.post('/signup', [check('name').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').isLength({ min: 6 })], usersControllers.signUp);

//route for log in
usersRouter.post('/login', usersControllers.logIn);


module.exports = usersRouter;