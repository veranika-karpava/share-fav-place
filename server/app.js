const fs = require('fs');
const path = require('path');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
// parse body from incoming request
const bodyParser = require('body-parser');

const placesRouter = require('./routes/places');
const usersRouter = require('./routes/users');
const HttpError = require('./models/http-error');

const app = express();

// registrate middleware to parse body. it should be before router middleware,
// because need to parse data and then router. Now we could use data from post request in function 
app.use(bodyParser.json());

// middleware for access image
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// handling CORS error
app.use((req, res, next) => {
    // force the browser
    // * allows any domain to send request
    res.setHeader('Access-Control-Allow-Origin', '*');
    // controlls which headers these requests sent by the browser may have
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    // controlls which HTTP methods may be used on front end
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next()
});


// registrate middleware for place router
// express.js will forward requests to places routes middleware if their path starts with /api/places
app.use('/api/places', placesRouter);
app.use('/api/users', usersRouter);

// for unsupported routes - registarte middleware that only is reached when some request doesn't have response before
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404)
    //    syncronize use throw, async  - use next
    throw error;
})

// registrate middleware for catch error
// default error handler
app.use((error, req, res, next) => {
    // check if a response has alredy been sent, if yes that means that we didn't sent response by our own
    if (res.headerSent) {
        return next(error);
    }
    // if not, sent now
    res
        .status(error.code || 500) // 500 something wrong in server
        .json({ message: error.message || "An unknown error occured" })
})

// connect with database and listen port
mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lhybrvz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        // if connection with db is succeseful, the port is listened
        app.listen(process.env.PORT || 5050, () => {
            console.log(`🚀 Server listening on ${process.env.PORT}`)
        })
    })
    .catch(err => {
        console.log(err)
    })


