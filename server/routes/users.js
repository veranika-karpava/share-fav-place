const express = require('express');

// import controller
const usersControllers = require('../controllers/users-controller');



// create our router
const usersRouter = express.Router();

// retrivere list of users
usersRouter.get('/', usersControllers.getUsers);

// route for sign up
usersRouter.post('/signup', usersControllers.signUp);

//route for log in
usersRouter.post('/login', usersControllers.logIn);


module.exports = usersRouter;