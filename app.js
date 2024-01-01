const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const db = require('./db');
const { User } = require('./db');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db });

require('dotenv').config();
const { json, urlencoded } = express;

// APP START
const app = express();

// First middleware we pass through during a request.
// Here we will set a policy for various domains/ips
// Detailing what they can and cannot do in a request
// [MIDDLEWARE]

// MIDDLEWARE STARTS HERE --------------------------------------------------
app.use(
  cors({
    origin: ['https://facebook.com', 'https://youtube.com'],
  })
);

// Enable logging for request [MIDDLEWARE]
app.use(logger('dev'));
// Parse the request into JSON [MIDDLEWARE]
app.use(json());
// Parse the URL encoded strings in the request [MIDDLEWARE]
app.use(urlencoded({ extended: false }));
// Parse the cookies in the request into readable format [MIDDLEWARE]
app.use(cookieParser());
// Enable the app to communicate with /public folder [MIDDLEWARE]
app.use(express.static(path.join(__dirname, 'public')));

// Auth check [MIDDLEWARE]
app.use((req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
      if (err) {
        // send to error
        return next();
      }

      User.findOne({
        where: { id: decoded.id },
      }).then((user) => {
        req.user = user;
        return next();
      });
    });
  } else {
    return next();
  }
});
// MIDDLEWARE ENDS HERE --------------------------------------------------

// API ROUTES
// app.use('/subroute', './route-file')

app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app, sessionStore };
