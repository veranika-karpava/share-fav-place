const jwt = require('jsonwebtoken');
const HttpError = require("../models/http-error");

// middleware - function which gets req, res obj and next func
module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    // get token
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKREN'
        // if token isn't exist
        if (!token) {
            throw new HttpError('Authentication failed')
        }
        // verify a token: if not fail, the user authenticated
        const decodedToken = jwt.verify(token, 'JWT_KEY');
        // add data to request
        req.userData = { userId: decodedToken.userId }
        // allows reach any other routes
        next();
    } catch (err) {
        // if req.headers is not set
        return next(new HttpError('Authentication failed', 401))

    }
}