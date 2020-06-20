const path = require('path');

module.exports = app => {

    app.get('/stats', (req,res) => {
        res.sendFile(path.join(__dirname,'./../../public/stats.html'))
    })

}