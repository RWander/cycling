'use strict';

// connect to db
require('./db').then(() => main());

function main() {
  let express = require('express');
  let logger = require('morgan');
  let bodyParser = require('body-parser');
  let config = require('config');

  let app = express();

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(corsHandler); // CORS

  // regester routes
  app.use('/', require('./routes/athletes'));
  app.use(notFoundHandler); // catch 404 and forward to error handler
  app.use(errorHandler);    // error handlers

  // start server
  let http = config.get('http');
  let server = app.listen(http.port, http.host, listenHandler);

  function corsHandler(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  }

  function notFoundHandler(req, res, next) {
    let err = new Error('Not Found');
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
    let host = server.address().address;
    let port = server.address().port;

    /* eslint-disable no-console */
    console.log('RESTful server "%s" listening at http://%s:%s', app.get('env'), host, port);
    /* eslint-disable no-console */
  }
}
