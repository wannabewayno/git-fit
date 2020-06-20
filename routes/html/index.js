const index = require('./index.routes.js')
const stats = require('./stats.routes.js')
const exercise = require('./exercise.routes.js')

module.exports = app => {

    index(app);
    stats(app);
    exercise(app);

}