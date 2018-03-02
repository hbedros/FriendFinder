// Node Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Link in html and api routes
var apiRoutes = require('./app/routing/api-routes.js');
var htmlRoutes = require('./app/routing/html-routes.js');

// Set up Express App
var app = express();
var PORT = process.env.PORT || 8080;