const express = require('express');
const { check } = require('express-validator')// import check method from express-validator


// import controller
const placesControllers = require('../controllers/places-controller');
// import obj with different middlewares
const fileUpload = require('../middleware/file-upload');

// create our router
const placesRouter = express.Router();

// get a specific place by place id(pid)
placesRouter.get('/:pid', placesControllers.getPlaceById);

//retrieve list of all places for given user id(uid)
placesRouter.get('/user/:uid', placesControllers.getPlacesByUserId);

// add a new place
placesRouter.post('/', fileUpload.single('image'), [check('title').not().isEmpty(), check('description').isLength({ min: 5 }), check('address').not().isEmpty()], placesControllers.createPlace);

// update a place by id(pid)
placesRouter.patch('/:pid', [check('title').not().isEmpty(), check('description').isLength({ min: 5 })], placesControllers.updatePlaceById);

// delete a place by id(pid)
placesRouter.delete('/:pid', placesControllers.deletePlaceById);

module.exports = placesRouter;

