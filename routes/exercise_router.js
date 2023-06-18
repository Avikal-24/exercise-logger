require('dotenv').config()
var express = require('express')
var router = express.Router()
const exercises = require('../models/exercises_model.js');

router.route('/').get((req, res) => { //gets all logged exercises

    exercises.find().then((response) => {
        res.json(response)
    }).catch((err) => {
        res.status(400).json('Error retrieving in exercises list: ' + err)
    });
});

router.route('/add').post((req, res) => { //adds a new exercise

    const username = req.body.username;
    const name = req.body.name;
    const duration = Number(req.body.duration);
    const date = req.body.date;

    const newExercise = new exercises({ username, name, duration, date })

    newExercise.save().then(() => {
        res.json('Exercise added')
    }).catch((err) => {
        res.status(400).json('Error adding a new exercise: ' + err)
    });
});

router.route('/:id').get((req, res) => { //gets an exercise by it's object ID

    const id = req.params.id;

    exercises.findById(id).then((response) => {
        res.json(response)
    }).catch((err) => {
        res.status(400).json('Error retrieving an exercise by id: ' + err)
    });
});

router.route('/:id').delete((req, res) => { //deletes an exercise by it's object ID

    const id = req.params.id;

    exercises.findByIdAndDelete(id).then(() => {
        res.json('Exercise Deleted!')
    }).catch((err) => {
        res.status(400).json('Error deleting an exercise by id: ' + err)
    });
});

router.route('/:id').post((req, res) => { //updates an exercise by it's object ID

    const id = req.params.id;

    const username = req.body.username;
    const name = req.body.name;
    const duration = Number(req.body.duration);
    const date = req.body.date;

    exercises.findById(id).then((response) => {

        response.username = username;
        response.name = name;
        response.duration = duration;
        response.date = date;

        response.save().then(() => {
            res.json('Exercise Updated!')
        }).catch((err) => {

            res.status(400).json('Error in updating an exercise by id: ' + err)

        });

    }).catch((err) => {
        res.status(400).json('Error in updating an exercise by id: ' + err)
    });
});



module.exports = router;