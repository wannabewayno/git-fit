// require dependencies
const db = require('../../models');
const { Mongoose } = require('mongoose');

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
        db.Workout.create()
        .then(response => res.json(response))
        .catch(error => {
            res.status()
            console.log(error)
        });
    });

    app.put('/api/workouts/:id', (req,res) => {
        console.log(req.body);
       db.Workout.updateOne({_id:req.params.id},{})
    });

    app.get('/api/workouts/range', (req,res) => {
        db.Workout.find({},)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => console.log(error))
    });

}