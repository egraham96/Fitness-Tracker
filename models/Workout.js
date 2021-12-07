const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
day: {
        type: Date,
        default: Date.now
    },

exercises: [{
  name: {
    type: String,
    required: "Name of exercise is required"
  },

  type: {
    type: String,
    required: "Type of Exercise is Required",
  },

 weight: {
    type: Number
  },

 set: {
    type: Number,
  },

 reps: {
    type: Number,
  },

  duration: {
    type: Number
},
distance: {
    type: Number
}
}]    
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;