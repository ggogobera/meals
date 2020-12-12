const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

mongoose.connect(process.env.DATABASE_URL, {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true
});

mongoose.connection.on('error', err => console.log(err));
mongoose.connection.once('open', () => console.log('Connected to DB'));

/**
 * CORS
 */
const corsWhitelist = ['http://localhost:3000', 'https://my-meals-server.herokuapp.com'];
app.use(
  cors({
    origin: function(origin, callback) {
      if (corsWhitelist.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
);

/**
 * Routes
 */
app.use('/api', require('./routes'));

/**
 * Global error handling
 */
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;
