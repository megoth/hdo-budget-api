/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');

// bootstrap models
require('./config/models')();

// bootstrap passport config
require('./config/passport')(passport);

var app = express();

// express settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
