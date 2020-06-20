const express = require('express');
const { urlencoded, static } = require('express');

// sets up our express app
PORT = process.env.PORT || 3141;
app = express();

// middleware 
// ==============================================================================

//sets up the express app to enable data parsing 
app.use(express.urlencoded( { extended:true } ));
app.use(express.json())

// set the static directory
app.use(express.static('public'));


// routes 
// ==============================================================================
const routes = require ('./routes');

// starts our server
// ==============================================================================
app.listen(PORT,() => console.log(`APP STARTED - available at http://localhost:${3141}`));