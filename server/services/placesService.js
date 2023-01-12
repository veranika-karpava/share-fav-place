const fs = require('fs');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Place = require('../models/place');
const User = require('../models/user');
const getCoordForAddress = require('../util/location');
const { dataUri } = require('../config/multerConfig');
const { uploader } = require('../config/cloudinaryConfig');

// for getting the forst place with the specified ID(pid)
const getPlaceById = async (req, res, next) => {
    // pid from url params
    const placeId = req.params.pid;

    let place;

    try {
        place = await Place.findById(placeId);
    } catch (err) {
        return next(new HttpError('Fetching place failed, could not find a place.', 500));
    };

    if (!place) {
        return next(new HttpError('Could not find a place for the provided id.', 404));
    };

    res.json({ place: place.toObject({ getters: true }) });
};

// for getting a list of places for given user ID(uid)
const getListPlacesByUserId = async (req, res, next) => {
    // get uid from url params
    const userId = req.params.uid;

    let userWithPlaces;

    // retrieve places list from database
    try {
        userWithPlaces = await User.findById(userId).populate('places');
    } catch (err) {
        return next(new HttpError('Fetching places failed, please try again later.', 500));
    };

    if (!userWithPlaces || userWithPlaces.places.length === 0) {
        return next(new HttpError('Could not find a place for the provided user id.', 404));
    };

    res.json({ places: userWithPlaces.places.map(place => place.toObject({ getters: true })) });
};

// create a new place
const createPlace = async (req, res, next) => {
    // validate inputs that passed in form
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    };

    //data that received from post request
    const { title, description, address } = req.body;

    // define coordinates from address
    let coordinates;

    try {
        coordinates = await getCoordForAddress(address);
    } catch (err) {
        return next(err);
    }

    // create a new place using Place Model
    let createdPlace;
    try {
        if (process.env.STORAGE_TYPE == "cloud") {
            const file = dataUri(req).content;
            const result = await uploader.upload(file);
            createdPlace = new Place({
                title,
                description,
                address,
                location: coordinates,
                image: result.secure_url,
                cloudinary_id: result.public_id,
                creator: req.userData.userId
            });
        } else {
            createdPlace = new Place({
                title,
                description,
                address,
                location: coordinates,
                image: req.file.path,
                cloudinary_id: null,
                creator: req.userData.userId
            });
        }
    } catch (err) { }

    //find user that created a new place in database
    let user;
    try {
        user = await User.findById(req.userData.userId);
    } catch (err) {
        return next(new HttpError('Creating place failed, please try again', 500));
    }

    // check existing user
    if (!user) {
        return next(new HttpError('Could not find user for provided id', 404));
    }

    try {
        // create session - start session when we want to create a place
        const sess = await mongoose.startSession();
        // transactions - allows to perform multiple operations in isolation of each other
        // start transaction in the current session. 
        //It's build in session. When the transaction is succefully
        //the session is finished
        sess.startTransaction();

        // place created w/t unique id and stored  on the current session
        await createdPlace.save({ session: sess });

        // grabs the created place id and adds it to the place field of the user.
        // push - is a method used by mongoose, which kind of allows Mongoose to, behind the scene,establish the connection between the two models we are referring to here.
        user.places.push(createdPlace);

        // save in users collection
        await user.save({ session: sess });

        // the session commits the transactions
        await sess.commitTransaction();
    }
    catch (err) {
        return next(new HttpError('Creating place failed, please try again.', 500));
    }

    res.status(201).json({ place: createdPlace })
};

// update place's place by given pid
const updatePlaceById = async (req, res, next) => {
    // check inputs data
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }

    //data that received from patch request
    const { title, description } = req.body;
    // get pid from url params
    const placeId = req.params.pid

    // find place's dat  from database
    let place;

    try {
        place = await Place.findById(placeId)
    } catch (err) {
        return next(new HttpError('Something went wrong, could not update place.', 500));
    }

    // check if this place belongs on this user
    if (place.creator.toString() !== req.userData.userId) {
        return next(new HttpError('You are not allowed to edit this place. ', 401));
    }

    place.title = title;
    place.description = description;

    // save data in database
    try {
        await place.save();
    } catch (err) {
        return next(new HttpError('Something went wrong, could not update place.', 500));
    }

    res.status(200).json({ place: place.toObject({ getters: true }) })
}

// delet place by providing pid
const deletePlaceById = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;

    try {
        // populate() - to refer to a document stored in another collection and to work with data in that existing document
        place = await Place.findById(placeId).populate('creator');
    } catch (err) {
        return next(new HttpError('Something went wrong, could not delete place.', 500));
    }

    if (!place) {
        return next(new HttpError('Could not find place for this is id', 404));
    }

    // check if this place belongs on this user
    if (place.creator.id !== req.userData.userId) {
        return next(new HttpError('You are not allowed to delete this place. ', 401));
    }

    // image path
    const imagePath = place.image;

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({ session: sess });
        place.creator.places.pull(place);
        await place.creator.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        return next(new HttpError('Something went wrong, could not delete place.', 500))
    }

    if (process.env.STORAGE_TYPE == "cloud") {
        await uploader.destroy(place.cloudinary_id);
    } else {
        fs.unlink(imagePath, err => { })
    }

    res.status(200).json({ message: "Deleted place." })
}

// for export many things
exports.getPlaceById = getPlaceById;
exports.getListPlacesByUserId = getListPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;