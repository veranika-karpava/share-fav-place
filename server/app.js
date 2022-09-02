const express = require('express');
const bodyParser = require('body-parser');// parse body from incoming request
const PORT = 8080;

//can use as a middleware everything from this object
const placesRouter = require('./routes/places');


const app = express();

// registrate middleware for place router
// express.js will forward requests to our places routes middleware if their path starts with /api/places
app.use('/api/places', placesRouter);

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

// listen port
app.listen(PORT, () => {
    console.log(`🚀 Server listening on ${PORT}`)
})
