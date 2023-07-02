const express = require('express');
const createHttpErrors = require('http-errors');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var passport = require('passport');
const {
  pageNotFound,
  serverErrorHandler,
} = require('../app/middlewares/response');
const port = process.env.PORT || 3000;
const app = express();
app.use(morgan('dev'));
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });
require('../app/config/database');

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(passport.initialize());
require('../app/middlewares/passport')(passport);

const routes = require('./routes/combineAllRoutes');

app.use(routes);

app.use((req, res, next) => {
  next(createHttpErrors.NotFound());
});

// Error-handling middleware for 500 errors
app.use((err, req, res, next) => {
  return serverErrorHandler(req, res, 'Internal Server Error');
});

routes.all('*', (req, res, next) => {
  return pageNotFound(req, res, 'Sorry, URL not found');
});

app.listen(port, function () {
  console.log('🚀 LISTENING ON THE PORT ' + port);
});
