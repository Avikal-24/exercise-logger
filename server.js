require('dotenv').config()
const express = require('express')
const app = express()
var cors = require('cors');
const port = process.env.PORT || 5000

const connectDB = require('./config/db')
connectDB()

//Middlewares
app.use(cors());
app.use(express.json()) //so it can accept json inputs
app.use(express.urlencoded({ extended: true }));  //important to destructure the form body (so it takes form-encoded data)

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

//Routes
app.use('/exercise', require('./routes/exercise_router'))
app.use('/user', require('./routes/user_router'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})