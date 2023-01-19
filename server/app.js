const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
process.env.NODE_ENV !== 'production' && require('dotenv').config();

const placesRouter = require('./middleware/placesRouter');
const usersRouter = require('./middleware/usersRouter');
const HttpError = require('./models/http-error');

const app = express();
app.use(cors());

// middlewares
// for parsing body that should be before registation routers
app.use(bodyParser.json());

// for accessing images locally
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// for handling CORS error
// app.use((_req, res, next) => {
//   // * allows any domain to send request
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   // type of headers that sent by the browser
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   // HTTP methods that can be used in client side
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//   next();
// });

// for registration routers
app.use('/api/places', placesRouter);
app.use('/api/users', usersRouter);

// for handling error when router isn't define
app.use(async (_req, _res, next) => {
  return next(new HttpError('The requested resource does not exist', 404));
});

// for catching error
app.use((error, _req, res, next) => {
  // check if a response has alredy been sent,
  if (res.headerSent) {
    return next(error);
  }
  // if not, sent now
  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error occured' });
});

// connect with database and listen port
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lhybrvz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    // if connection with db is succeseful, the port is listened
    app.listen(process.env.PORT || 5050, () => {
      console.log(`🚀 Server listening on ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
