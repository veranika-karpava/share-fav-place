const express = require('express');
const { check } = require('express-validator');

const {
  getListPlaces,
  getPlaceById,
  getListPlacesByUserId,
  createPlace,
  updatePlaceById,
  deletePlaceById,
} = require('../services/placesService');
const { fileUpload } = require('../config/multerConfig');
const { cloudinaryConfig } = require('../config/cloudinaryConfig');
const loggedIn = require('./authMiddleware');

const placesRouter = express.Router();

placesRouter.get('/', getListPlaces);

// get a place by specified place ID(pid)
placesRouter.get('/:pid', getPlaceById);

// get a list of places for given user ID(uid)
placesRouter.get('/user/:uid', getListPlacesByUserId);

// authorization
placesRouter.use(loggedIn);

// create new place
placesRouter.post(
  '/',
  cloudinaryConfig,
  fileUpload,
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty(),
  ],
  createPlace
);

// update a place by specified place ID(pid)
placesRouter.patch(
  '/:pid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  updatePlaceById
);

// delete a place by given place ID(pid)
placesRouter.delete('/:pid', deletePlaceById);

module.exports = placesRouter;
