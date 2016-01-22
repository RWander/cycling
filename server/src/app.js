// connect to db
require('./db');

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('config');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(corsHandler); // CORS

// regester routes
app.use('/', require('./routes/athletes'));
app.use(notFoundHandler); // catch 404 and forward to error handler
app.use(errorHandler);    // error handlers

// start server
var http = config.get('http');
var server = app.listen(http.port, http.host, listenHandler);

function corsHandler(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}

function notFoundHandler(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: app.get('env') === 'production'
      ? { }
      : err
  });
}

function listenHandler() {
  var host = server.address().address;
  var port = server.address().port;

  /* eslint-disable no-console */
  console.log('RESTful server "%s" listening at http://%s:%s', app.get('env'), host, port);
  /* eslint-disable no-console */
}
