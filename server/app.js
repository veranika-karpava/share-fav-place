const express = require('express');
const bodyParser = require('body-parser');// parse body from incoming request
const PORT = 8080;

//can use as a middleware everything from this object
const placesRouter = require('./routes/places');
const HttpError = require('./models/http-error');

const app = express();

// registrate middleware to parse body. it should be before router middleware, because need to parse data and then router. Now we could use data from post request in function 
app.use(bodyParser.json());

// registrate middleware for place router
// express.js will forward requests to our places routes middleware if their path starts with /api/places
app.use('/api/places', placesRouter);

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

// listen port
app.listen(PORT, () => {
    console.log(`🚀 Server listening on ${PORT}`)
})
