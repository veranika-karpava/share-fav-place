const express = require('express');

// create our router
const placesRouter = express.Router();

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

// get a specific place by place id(pid)
placesRouter.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid //{ pid: 'p1'}
    const place = DUMMY_PLACES.find(place => {
        return place.id === placeId;
    })
    if (!place) {
        // use status method to send status code and message
        // return res
        //     .status(404)
        //     .json({ message: "Could not find a place for the provided id" })

        // or trigger error handling middleware for not async
        const error = new Error('Could not find a place for the provided id.');
        error.code = 404;
        throw error;
    }
    res.json({ place: place });
});

//retrieve list of all places for given user id(uid)
placesRouter.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid // { uid: 'u1'}
    const places = DUMMY_PLACES.find((place) => place.creator === userId);
    if (!places) {
        // use status method to send status code and message
        // return res
        //     .status(404)
        //     .json({ message: "Could not find a place for the provided user id" })

        // or triggered error middleware handler for ansync
        const error = new Error('Could not find a place for the provided user id.');
        error.code = 404;
        return next(error);
    }

    res.json({ places: places });
})





module.exports = placesRouter;

