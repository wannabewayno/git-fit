// set env variables
// ==============================================================================
require('dotenv').config();

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


// 
// ==============================================================================



// routes 
// ==============================================================================
const routes = require ('./routes');
routes(app);


// start our server
// ==============================================================================

//set up the mongoDB connecition
const connection = require('./config/connection.config');

connection
.then(connected => { // if connected start server
    app.listen(PORT,() => console.log(`APP STARTED - available at http://localhost:${3141}`));
})
.catch(error => console.log(error));


