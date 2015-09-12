/// <reference path='../typings/tsd.d.ts' />

import express = require('express');
import path = require('path');
import logger = require('morgan');
import bodyParser = require('body-parser');

// TODO (Roman)
// use routes
// ..
// import routes = require('./routes/index');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// TODO (Roman)
// use routes
// ..
// app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: Function) => {
   var err = new Error('Not Found');
   err['status'] = 404;
   next(err);
});

// error handlers
if (app.get('env') === 'development') {
   app.use((err: any, req: express.Request, res: express.Response, next: Function) => {
       res.status(err['status'] || 500);
       res.render('error', {
           message: err.message,
           error: app.get('env') === 'production' ? {} : err
       });
   });
}

export = app;
