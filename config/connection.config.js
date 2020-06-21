const mongoose = require('mongoose');

const connection = mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost/userdb",
        { 
            useNewUrlParser: true,
        }
    );

module.exports = connection;