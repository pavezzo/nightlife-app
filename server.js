'use strict';

const express = require('express')
const mongoose = require('mongoose')
const routes = require('./app/routes/router.js')
const bodyParser = require('body-parser')
const flash = require('req-flash')
const session = require('express-session')


const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(session({
    secret: 'catsanddogs123',
    saveUninitialized: true,
    resave: true,
    cookie: {
        httpOnly: false
    }
}))
app.use(flash())
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'))


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nightlife')

routes(app)

app.listen(process.env.PORT)
