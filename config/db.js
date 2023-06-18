require('dotenv').config()
const mongoose = require('mongoose')


function connectDB() {

    console.log(process.env.MONGO_CONNECTION_URL)
    mongoose.connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to MongoDB Cloud Service")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    }); 
}

module.exports = connectDB;