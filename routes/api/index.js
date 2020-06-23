// require dependencies
const db = require('../../models');
const { Mongoose } = require('mongoose');

// pass the server instance through the API controller
module.exports = app => {

    app.get('/api/workouts', (req,res) => {
        db.Workout.find({})
        .then(results => {
            console.log(results);
            res.json(results).status(200)} )
        .catch(error => res.status(501).json(error) );
    });

    app.post('/api/workouts', (req,res) => {
        console.log(req.body);
        db.Workout.create(req.body)
        .then(response => res.status(201).json(response) )
        .catch(error => res.status(422).json(error) );
    });

    app.put('/api/workouts/:id', async (req,res) => {
        // exercises to add
        const exercise = req.body;
        console.log(exercise);
        // id of the workout to add the exercises to
        const id = req.params.id;
        console.log(`id is: ${id}`);

        // get our workout instance we want to update
        const WorkoutInstance = await db.Workout.findOne({_id:req.params.id})

        // update our workout 
        // ==================
        console.log(WorkoutInstance);
        // add the exercise
        WorkoutInstance.addExercise(exercise);
        // re-calculate total duration
        WorkoutInstance.calculateTotalDuration();

        // save our workout
        WorkoutInstance.save()
        //respond to the client once saved
        .then(response => res.status(202).json(response) )
        .catch(error => {
            console.log(error);
            res.status(422).json(error)} );
    });

    app.get('/api/workouts/range', (req,res) => {
        db.Workout.find({},)
        .then(response => res.status(200).json(response) )
        .catch(error => console.log(error) )
    });

}