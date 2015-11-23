/// <reference path='../typings/tsd.d.ts' />

import express = require('express');
import path = require('path');
import logger = require('morgan');
import bodyParser = require('body-parser');
import config = require('config');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// regester routes
app.use('/', require('./routes/athletes'));

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: Function) => {
  var err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use((err: any, req: express.Request, res: express.Response, next: Function) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: app.get('env') === 'production' ? {} : err
  });
});

// start server
var http: any = config.get('http');
var server = app.listen(http.port, http.host, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('RESTful server "%s" listening at http://%s:%s', app.get('env'), host, port);
});
