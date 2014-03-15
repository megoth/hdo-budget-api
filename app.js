/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    auth = require('./config/middlewares/authorization');

// bootstrap models
require('./config/models')();

// bootstrap passport config
require('./config/passport')(passport);

var app = express();

// express settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport, auth);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
