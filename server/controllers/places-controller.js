// file focus on middleware functions for places
const { v4: uuid } = require('uuid');

// import model for handling error
const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
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

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid // { uid: 'u1'}
    const places = DUMMY_PLACES.find((place) => place.creator === userId);
    if (!places) {
        // 1) use status method to send status code and message
        // return res
        //     .status(404)
        //     .json({ message: "Could not find a place for the provided user id" })

        // 2) triggered error middleware handler for ansync
        // const error = new Error('Could not find a place for the provided user id.');
        // error.code = 404;
        // return next(error);

        // 3) use class function from models
        return next(new HttpError('Could not find a place for the provided id.', 404));
    }

    res.json({ places: places });
};

// middleware function for create new place
const createPlace = (req, res, next) => {
    // data that we recived from post request
    const { title, description, coordinates, address, creator } = req.body;

    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({ place: createdPlace })
}

// for updating place by id
const updatePlaceById = (req, res, next) => {
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


}


// for export many things
exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;