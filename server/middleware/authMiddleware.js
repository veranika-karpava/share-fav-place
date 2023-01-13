const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const JWT_KEY = process.env.JWT_SECRET_KEY;

// for checking authorization
const loggedIn = (req, _res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new HttpError('Authentication failed', 401);
    }
    // verify a token: if not fail, the user authenticated
    const decodedToken = jwt.verify(token, JWT_KEY);
    // add data to request
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    // if req.headers is not set
    return next(new HttpError('Authentication failed', 401));
  }
};

module.exports = loggedIn;
