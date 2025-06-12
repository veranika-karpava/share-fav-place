const axios = require('axios');

const HttpError = require('../models/http-error');
const API_KEY = process.env.BACKEND_GOOGLE_API_KEY;

const getCoordForAddress = async address => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );
  const { data } = response;

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address. Please try again.',
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;
  return coordinates;
};

module.exports = getCoordForAddress;
