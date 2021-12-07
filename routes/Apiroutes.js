const router = require('express').Router();
const db = require("../models");

//GET Route for Getting the last Workout
router.get("/api/workouts", (req, res) => { 
  db.Workout.find({})
  .then(dbWorkout => {
      res.json(dbWorkout);
  })
  .catch(err => {
  res.status(400).json(err);
  });
});


//GET Route for Getting the Range of Workouts 
router.get("/api/workouts/range", ({params}, res) => { 
    var d = new Date();
    d.setDate(d.getDate()-10);
    db.Workout.aggregate([
        { 
            $match: { 'day' : {$gte: d}},
        },    
        {
            $addFields:{
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
    res.status(400).json(err);
    });
});

//Post Route for Creating a Workout
router.post('/api/workouts', ({ body }, res) => {
    db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//Put Route for Updating a Workout
router.put('/api/workouts/:id', ({ body, params}, res) => {
    id= params.id
    db.Workout.findByIdAndUpdate(id, {$push: {exercises: body}}, {new: true})
    .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  module.exports = router;