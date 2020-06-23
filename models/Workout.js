const mongoose = require('mongoose');
const Resistance = require('./Resistance');
const Cardio = require('./Cardio');
const Schema = mongoose.Schema;

// Schema
// ==============================================================================

const WorkoutSchema = new Schema({

    day: { type:Date, default: Date.now() },
    totalDuration:{type: Number,},
    exercises: { type: Array,},

});

// Instance Methods
// ==============================================================================
WorkoutSchema.methods.calculateTotalDuration = function(){
    let duration = 0;
    this.exercises.forEach(exercise => {
        duration += exercise.duration;
    });
    this.totalDuration = duration;
    return this.totalDuration;
}

WorkoutSchema.methods.addExercise = function(exercise) {

    // creates a new exercise object
    if (exercise.type === 'resistance' ) {
        exercise = new Resistance(exercise);
    }
    if (exercise.type === 'cardio') {
        exercise = new Cardio(exercise);
    }

    // add exercise to our workout
    this.exercises.push(exercise)

    // returns the exercise to the caller
    return this.exercises;
}

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;