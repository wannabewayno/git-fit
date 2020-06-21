// require dependencies
const db = require('../../models');

// pass the server instance through the API controller
module.exports = app => {

    app.get('/api/workouts', (req,res) => {
        db.Workout.find({})
        .then(results => {
            console.log(results);
            res.json(results).status(200);
        });
    });

    app.post('/api/workouts', (req,res) => {
        console.log(req.body);
        console.log(`post /api/workouts`);
        res.json({message:'POST REQUEST api/workouts'});
        res.status(200)
    });

    app.put('/api/workouts/:id', (req,res) => {
        console.log(req.params.id);
        console.log(`put /api/workouts`);
        res.json({message:'PUT response from api/workouts/'});
        res.status(200)
    });

    app.get('/api/workouts/range', (req,res) => {
        console.log(req.params);
        console.log(`get /api/workouts/range`);
        res.json({message:'hitting api/workouts/range'});
        res.status(200)
    });

}