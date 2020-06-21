// require dependencies
const db = require('../../models');

// pass the server instance through the API controller
module.exports = app => {

    app.get('/api/workouts', (req,res) => {
        console.log(`get /api/workouts`)
        res.json();
        res.status(200);
    });

    app.post('/api/workouts', (req,res) => {
        console.log(`post /api/workouts`);
        res.json();
        res.status(200)
    });

    app.put('/api/workouts/:id', (req,res) => {
        console.log(`put /api/workouts`);
        res.json();
        res.status(200)
    });

    app.get('/api/workouts/range', (req,res) => {
        console.log(`get /api/workouts/range`);
        res.json();
        res.status(200)
    });

}