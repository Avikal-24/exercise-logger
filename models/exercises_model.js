const mongoose = require('mongoose')


var exercises = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
   
 }, { timestamps: true });

module.exports = mongoose.model('exercises', exercises);