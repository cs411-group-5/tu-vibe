var envs = require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const MongoClient = require("mongodb").MongoClient;

const MONGO_URI = process.env.MONGO_SRV;
const LISTEN_PORT = 8889;

var indexRouter = require('./routes/index');
var yelpRouter = require('./routes/yelp');
var spotifyRouter = require('./routes/spotify');
var dbRouter = require('./routes/db');
var userRouter = require('./routes/user');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use('/', indexRouter);
app.use('/yelp', yelpRouter);
app.use('/spotify',spotifyRouter)
app.use('/db', dbRouter)
app.use('/user', userRouter)

// Create a MongoDB connection pool and start the application
// after the database connection is ready
MongoClient.connect(MONGO_URI, { promiseLibrary: Promise, useNewUrlParser:true }, (err, client) => {
    if (err) {
      console.log(`Failed to connect to the database. ${err.stack}`);
    }
    app.locals.db = client.db("CS411");

    app.listen(LISTEN_PORT);
    console.log(`API Server listening on ${LISTEN_PORT}`);
  });



module.exports = app;
