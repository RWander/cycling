/// <reference path='../typings/tsd.d.ts' />
/// <reference path='../typings-custom/node-config.d.ts' />

import express = require('express');
import path = require('path');
import logger = require('morgan');
import bodyParser = require('body-parser');
import config = require('config');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// regester routes
app.use('/', require('./routes/athletes'));

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: Function) => {
  var err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (app.get('env') === 'development') {
  app.use((err: any, req: express.Request, res: express.Response, next: Function) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: app.get('env') === 'production' ? {} : err
    });
  });
}

// start server
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})
