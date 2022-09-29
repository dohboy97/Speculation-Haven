const express = require('express')

const app = express()

const connectDB = require('./config/database')
//save passport, session, etc until after mvp functional
const MongoStore = require('connect-mongo')


//routes
const landingRoute = require('./routes/landing')

//insert passport config once passport installed

const bodyParser = require('body-parser')
const { default: mongoose } = require('mongoose');

require('dotenv').config({path: './config/.env'})

connectDB()

app.set('view engine', 'react')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const PORT = process.env.PORT
app.listen(PORT || 3000, ()=>{
    console.log(`Server is running on port ${PORT}`)
})     