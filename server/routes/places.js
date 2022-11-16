const express = require('express');
const { check } = require('express-validator')// import check method from express-validator

const placesControllers = require('../controllers/places-controller');
const { fileUpload } = require('../config/multerConfig');
const { cloudinaryConfig } = require('../config/cloudinaryConfig');
const checkAuth = require('../middleware/check-auth');

// create router
const placesRouter = express.Router();

// get a place by specified place's id(pid)
placesRouter.get('/:pid', placesControllers.getPlaceById);

//retrieve list of places for given user id(uid)
placesRouter.get('/user/:uid', placesControllers.getPlacesByUserId);


// send back an error response if the request has no valid token and it blocked other routes
placesRouter.use(checkAuth);

// add a new place
placesRouter.post('/', cloudinaryConfig, fileUpload, [check('title').not().isEmpty(), check('description').isLength({ min: 5 }), check('address').not().isEmpty()], placesControllers.createPlace);

// update a place by id(pid)
placesRouter.patch('/:pid', [check('title').not().isEmpty(), check('description').isLength({ min: 5 })], placesControllers.updatePlaceById);

// delete a place by id(pid)
placesRouter.delete('/:pid', placesControllers.deletePlaceById);

module.exports = placesRouter;

