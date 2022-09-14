const express = require('express');

// import controller
const placesControllers = require('../controllers/places-controller');

// create our router
const placesRouter = express.Router();

// get a specific place by place id(pid)
placesRouter.get('/:pid', placesControllers.getPlaceById);

//retrieve list of all places for given user id(uid)
placesRouter.get('/user/:uid', placesControllers.getPlacesByUserId);

// add a new place
placesRouter.post('/', placesControllers.createPlace);

// update a place by id(pid)
placesRouter.patch('/:pid', placesControllers.updatePlaceById);

// delete a place by id(pid)
placesRouter.delete('/:pid', placesControllers.deletePlaceById);

module.exports = placesRouter;

