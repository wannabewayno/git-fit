// set env variables
// ==============================================================================
require('dotenv').config();
console.log(process.env.MONGODB_URI);


// Dependencies
// ==============================================================================
const express = require('express');
const logger = require('morgan');

// sets up our express app
PORT = process.env.PORT || 3141;
app = express();


// middleware 
// ==============================================================================

// uses morgan as our logger
app.use(logger('dev'));

//sets up the express app to enable data parsing 
app.use(express.urlencoded( { extended:true } ));
app.use(express.json())

// set the static directory
app.use(express.static('public'));


// set up the mongoDB connecition
// ==============================================================================
const connection = require('./config/connection.config');


// routes 
// ==============================================================================
const routes = require ('./routes');
routes(app);


// starts our server
// ==============================================================================
app.listen(PORT,() => console.log(`APP STARTED - available at http://localhost:${3141}`));