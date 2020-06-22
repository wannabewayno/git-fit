const mongoose = require('mongoose');

const connection = mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost/workout",
        { 
            useNewUrlParser: true,
        }
    );

module.exports = connection;