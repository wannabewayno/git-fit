const mongoose = require("mongoose");
const Resistance = require("./Resistance.exercise");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({

    day: { type:Date, default: new Date().setDate( new Date().getDate() ) },
    totalDuration:Number,
    exercises: [require('./exercise.schema')],

});

WorkoutSchema.methods.calculateDuration = function(){
    let duration = 0;
    this.exercises.forEach(exercise => {
        duration += exercise.duration;
    });
    this.totalDuration = duration;
    return this.totalDuration;
}

WorkoutSchema.methods.addExercises = function(exercises) {

    // maps exercises object to Exercise class
    exercises.map(exercise => {
        new Resistance(exercise)
    });

    // sets exercises to our workout
    this.Exercises.push(exercises)
    // returns these exercises to the caller
    return this.Exercises;
}

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;