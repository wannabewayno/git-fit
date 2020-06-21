const fs = require('fs');
const path = require('path');


//  define our db object
const db = {}

// get's all models that's not our index.js file
// we will assume this file only contains .js extension
const schemas = fs.readdirSync(__dirname).filter(schema => {
    if(schema.indexOf('index.js') === -1){
        return schema;
    }
})

// loads the empty db object with all our models
schemas.forEach(schema => {
    const SchemaName = schema.replace('.js','');
    db[SchemaName] = require(`./${schema}`)
});

// Exports our database for use within the app
module.exports = db;

