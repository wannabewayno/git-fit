const html = require('./html');
const api = require('./api');

module.exports = app => {

    api(app);
    html(app);

}