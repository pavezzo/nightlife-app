const mongoose = require('mongoose')
const User = require(process.cwd() + '/app/models/user.js')(mongoose)


exports.register = (data, callback) => {

    let newUser = new User({ username: data.username, password: data.password })

    newUser.save((err) => {
        if (err) {
            callback(true)
        } else {
            callback(false)
        }
    })
}


exports.signin = (data, callback) => {

    User.findOne({ username: data.username }, (err, user) => {
        if (user === null) {
            callback(null)
        } else if (user.password === data.password) {
            callback(user)
        } else {
            callback(null)
        }
    })
}


exports.going = (reqCity, reqBar, user) => {

    User.findOne({ username: user }, (err, user) => {

        if (user.city === reqCity && user.bar === reqBar) {
            user.city = '';
            user.bar = '';
            user.save((err) => {
                if (err) console.error(err)
            })
        } else {
            user.city = reqCity;
            user.bar = reqBar;
            user.save((err) => {
                if (err) console.error(err)
            })
        }
    })
}


exports.viewGoings = (reqCity, callback) => {

    User.find({ city: reqCity }, (err, users) => {
        callback(users)
    })
}
