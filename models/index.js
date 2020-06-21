const fs = require('fs');
const { HotModuleReplacementPlugin } = require('webpack');


//  define our db object
const db = {}

// matches anything that's not our index.js file
// we will assume this file only contains .js extensions
const schemas;
schemas = fs.readdirSync(__dirname).filter(schema => {
    if(schema.indexOf('index.js') === -1){
        return schema;
    }
})

// loads the empty db object with all our models
schemas.forEach(schema => {
    const SchemaName = schema.replace('.js','');
    db[SchemaName] = require(path.join(`./${schema}`))
});

// Exports our database for use within the app
module.exports = db;
