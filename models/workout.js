const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Workout = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [Object]
});

const workout = mongoose.model("Workout", Workout);
module.exports = workout;