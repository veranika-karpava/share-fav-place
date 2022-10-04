const { v4: uuid } = require('uuid'); // file focus on middleware functions for places
const { validationResult } = require('express-validator'); // import result from express-validator

// import model for handling error
const HttpError = require('../models/http-error');
const Place = require('../models/place');
const getCoordForAddress = require('../util/location');


let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p1',
        title: 'Empire',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    }
]
// function for getting a specific place by place id(pid)
const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid //{ pid: 'p1'}
    const place = DUMMY_PLACES.find(place => {
        return place.id === placeId;
    })
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
        throw new HttpError('Could not find a place for the provided id.', 404);
    }
    res.json({ place: place })
};

// function for retrieving list of all places for given user id(uid)
const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid // { uid: 'u1'}
    const places = DUMMY_PLACES.filter((place) => place.creator === userId);
    if (!places || places.length === 0) {
        // 1) use status method to send status code and message
        // return res
        //     .status(404)
        //     .json({ message: "Could not find a place for the provided user id" })

        // 2) triggered error middleware handler for ansync
        // const error = new Error('Could not find a place for the provided user id.');
        // error.code = 404;
        // return next(error);

        // 3) use class function from models
        return next(new HttpError('Could not find a place for the provided user id.', 404));
    }

    res.json({ places: places });
};

// middleware function for create new place
const createPlace = async (req, res, next) => {
    // call validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }
    // data that we recived from post request
    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordForAddress(address);
    } catch (error) {
        return next(error)
    }


    // const createdPlace = {
    //     id: uuid(),
    //     title,
    //     description,
    //     location: coordinates,
    //     address,
    //     creator
    // };
    // create new place by using model 
    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        creator
    });

    try {
        // save in mongo db
        await createdPlace.save();
    }
    catch (err) {
        const error = new HttpError('Creating place failed, please try again.', 500);
        return next(error);
    }
    res.status(201).json({ place: createdPlace })
}

// for updating place by id
const updatePlaceById = (req, res, next) => {
    // call validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data', 422);
    }
    const { title, description } = req.body;
    const placeId = req.params.pid
    // use spread operator to update copy of data at first, and when all data is updated, will update original
    const updatedPlace = { ...DUMMY_PLACES.find(place => place.id === placeId) };
    const placeIndex = DUMMY_PLACES.findIndex(place => place.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({ place: updatedPlace })

}

// for delete place by id
const deletePlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    if (!DUMMY_PLACES.find(place => place.id === placeId)) {
        throw new HttpError('Could not find a place for that id', 404);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(place => place.id !== placeId);
    res.status(200).json({ message: "Deleted place." })
}

// for export many things
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;