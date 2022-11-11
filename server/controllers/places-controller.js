const fs = require('fs');
const { v4: uuid } = require('uuid'); // file focus on middleware functions for places
const { validationResult } = require('express-validator'); // import result from express-validator
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Place = require('../models/place');
const User = require('../models/user');
const getCoordForAddress = require('../util/location');

// function for getting a specific place id(pid)
const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid //{ pid: 'p1'}
    // get data from json file
    // const place = DUMMY_PLACES.find(place => {
    //     return place.id === placeId;
    // })

    // get data from db
    let place;

    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a place', 500);
        return next(error);
    }

    if (!place) {
        // 1) use status method to send status code and message:
        // return res
        //     .status(404)
        //     .json({ message: "Could not find a place for the provided id" })

        // 2) trigger error handling middleware for not async
        // const error = new Error('Could not find a place for the provided id.');
        // error.code = 404;
        // throw error;

        // 3) use class function for error handling
        const error = new HttpError('Could not find a place for the provided id.', 404);
        return next(error)
    }
    res.json({ place: place.toObject({ getters: true }) })
};

// function for retrieving list of all places for given user id(uid)
const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid // { uid: 'u1'}
    // const places = DUMMY_PLACES.filter((place) => place.creator === userId);

    // 1) one option
    // let places;
    // try {
    //     places = await Place.find({ creator: userId })
    // } catch (err) {
    //     const error = new HttpError('Fetching places failed, please try again later', 500);
    //     return next(error);
    // }
    // if (!places || places.length === 0) {
    //     return next(new HttpError('Could not find a place for the provided user id.', 404));
    // }
    //res.json({ places: places.map(place => place.toObject({ getters: true })) });

    // 2) second option  - used populate()
    let userWithPlaces;
    try {
        userWithPlaces = await User.findById(userId).populate('places')
    } catch (err) {
        const error = new HttpError('Fetching places failed, please try again later', 500);
        return next(error);
    }
    if (!userWithPlaces || userWithPlaces.places.length === 0) {
        return next(new HttpError('Could not find a place for the provided user id.', 404));
    }
    res.json({ places: userWithPlaces.places.map(place => place.toObject({ getters: true })) });
};

//function for creating a new place
const createPlace = async (req, res, next) => {
    // call validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }
    // data that we recived from post request
    const { title, description, address } = req.body;
    let coordinates;
    try {
        coordinates = await getCoordForAddress(address);
    } catch (error) {
        return next(error)
    }

    // create place with no database 
    // const createdPlace = {
    //     id: uuid(),
    //     title,
    //     description,
    //     location: coordinates,
    //     address,
    //     creator
    // };

    let resultUrl;

    // if (process.env.STORAGE_TYPE == 'cloud') {
    //     resultUrl = await cloudinary.uploader.upload(req.file.path);
    // } else {
    //     resultUrl = req.file.path;
    // }

    // create new place by using model 
    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: resultUrl,
        creator: req.userData.userId
    });

    //find user that created a new place
    let user;
    try {
        user = await User.findById(req.userData.userId);
    } catch (err) {
        return next(new HttpError('Creating place failed, please try again', 500))
    }

    // check user exists or not
    if (!user) {
        return next(new HttpError('Could not find user for provided id', 404))
    }

    try {
        // create session - start session when we want to create a place
        const sess = await mongoose.startSession();
        // transactions - allows to perform multiple operations in isolation of each other
        // start transaction in the current session. It's build in session. When the transaction is succefully, the session is finished
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
        const error = new HttpError('Creating place failed, please try again.', 500);
        return next(error);
    }
    res.status(201).json({ place: createdPlace })
}

// function for updating place by given id
const updatePlaceById = async (req, res, next) => {
    // call validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }
    const { title, description } = req.body;
    const placeId = req.params.pid

    // for data from json file
    // use spread operator to update copy of data at first, and when all data is updated, will update original
    // const updatedPlace = { ...DUMMY_PLACES.find(place => place.id === placeId) };
    // const placeIndex = DUMMY_PLACES.findIndex(place => place.id === placeId);
    // updatedPlace.title = title;
    // updatedPlace.description = description;
    // DUMMY_PLACES[placeIndex] = updatedPlace;
    // res.status(200).json({ place: updatedPlace })


    // for data from db
    let place;

    try {
        place = await Place.findById(placeId)
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update place.', 500);
        return next(error);
    }

    // check if this place belongs on this user
    if (place.creator.toString() !== req.userData.userId) {
        return next(new HttpError('You are not allowed to edit this place. ', 401));
    }

    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update place.', 500);
        return next(error);
    }

    res.status(200).json({ place: place.toObject({ getters: true }) })
}

// function for deleting place by providing id
const deletePlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    // for data json file
    // if (!DUMMY_PLACES.find(place => place.id === placeId)) {
    //     throw new HttpError('Could not find a place for that id', 404);
    // }
    // DUMMY_PLACES = DUMMY_PLACES.filter(place => place.id !== placeId);

    let place;

    try {
        // populate() - to refer to a document stored in another collection and to work with data in that existing document
        place = await Place.findById(placeId).populate('creator');
    } catch (err) {
        const error = new HttpError('Something went wrong, could not delete place.', 500);
        return next(error);
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

    fs.unlink(imagePath, err => {
        console.log(err)
    })

    res.status(200).json({ message: "Deleted place." })
}

// for export many things
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;