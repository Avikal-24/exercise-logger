const mongoose = require('mongoose')


var users = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }

 }, { timestamps: true });

module.exports = mongoose.model('users', users);