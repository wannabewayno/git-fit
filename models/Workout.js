const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({

    Day: { type:Date, default: new Date().setDate( new Date().getDate() ) },
    Exercise: [require('./Exercise')],

});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;