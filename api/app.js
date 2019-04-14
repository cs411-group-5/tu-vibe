var envs = require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


const LISTEN_PORT = 8889;

var indexRouter = require('./routes/index');
var yelpRouter = require('./routes/yelp');
var spotifyRouter = require('./routes/spotify');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use('/', indexRouter);
app.use('/yelp', yelpRouter);
app.use('/spotify',spotifyRouter)

app.listen(LISTEN_PORT);
console.log(`API Server listening on ${LISTEN_PORT}`);
module.exports = app;
