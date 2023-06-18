require('dotenv').config()
var express = require('express')
var router = express.Router()
const users = require('../models/users_model.js');

router.route('/').get((req, res) => { //gets all users

    users.find().then((response) => {
        res.json(response)
    }).catch((err) => {
        res.status(400).json('Error: ' + err)
    });
});


router.route('/:id').get((req, res) => { //gets all users

    users.findById(req.params.id).then((response) => {
        res.json(response)
    }).catch((err) => {
        res.status(400).json('Error: ' + err)
    });
});


router.route('/add').post((req, res) => { //add a new user

    const username = req.body.username;
    const newUser= new users({username})
    newUser.save().then(() => {
        res.json('User added')
    }).catch((err) => {
        res.status(400).json('Error in PSOT http request on adding new username: ' + err)
    });
});

module.exports = router;