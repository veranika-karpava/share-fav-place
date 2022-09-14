const express = require('express');

// import controller
const placesControllers = require('../controllers/places-controller');

// create our router
const placesRouter = express.Router();

// get a specific place by place id(pid)
placesRouter.get('/:pid', placesControllers.getPlaceById);

//retrieve list of all places for given user id(uid)
placesRouter.get('/user/:uid', placesControllers.getPlaceByUserId);

// add new place
placesRouter.post('/', placesControllers.createPlace);


module.exports = placesRouter;

