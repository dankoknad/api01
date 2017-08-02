// BASE SETUP
// =============================================================================

// call the packages we need
var colors = require('colors');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var router = require('./app/routes/router');

mongoose.connect('mongodb://localhost/api01'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', router);


// START THE SERVER
// =============================================================================

app.listen(port);
console.log('Magic happens on port ' + port);


console.log(router);


