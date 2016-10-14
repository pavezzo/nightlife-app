const yelp = require(process.cwd() + '/app/controllers/yelpHandler.js')
const user = require(process.cwd() + '/app/controllers/userHandler.js')

module.exports = (app) => {

    app.route('/')
        .get((req, res) => {
            res.render('index', { user: req.session.user })
        })


    app.route('/bars/:city')
        .get((req, res) => {
            let search = req.params.city.toLowerCase();
            yelp(search, (data) => {
                user.viewGoings(search, (goingData) => {
                    res.render('bars', { bars: data, goings: goingData, user: req.session.user })
                })
            })
        })

        .post((req, res) => {
            if (req.session.user) {
                user.going(req.params.city.toLowerCase(), req.body.bar, req.session.user)
                res.redirect('/bars/' + req.params.city)
            } else {
                res.redirect('/signin?city=' + req.params.city)
            }
        })


    app.route('/bars')
        .get((req, res) => {
            res.redirect('/')
        })

        .post((req, res) => {
            res.redirect('/bars/' + req.body.search)
        })


    app.route('/register')
        .get((req, res) => {
            res.render('register', { flash: req.flash('error'), user: req.session.user })
        })

        .post((req, res) => {
            user.register(req.body, (err) => {
                if (err) {
                    req.flash('error', 'Username already taken!')
                    if (req.query.city != undefined) {
                        res.redirect('/register?city=' + req.query.city)
                    } else {
                        res.redirect('/register')
                    }
                } else {
                    if (req.query.city != undefined) {
                        res.redirect('/signin?city=' + req.query.city)
                    } else {
                        res.redirect('/signin')
                    }
                }
            })
        })


    app.route('/signin')
        .get((req, res) => {
            if (req.session.user != null) {
                res.render('signin', { user: req.session.user })
            } else {
                res.render('signin', { flash: req.flash('error'), redirect: req.query.city })
            }
        })

        .post((req, res) => {
            user.signin(req.body, (user) => {
                if (user === null) {
                    req.flash('error', 'Invalid username or password!')
                    res.redirect('signin')
                } else {
                    req.session.user = user.username;
                    if (req.query.city) {
                      res.redirect('/bars/' + req.query.city)
                    } else {
                      res.redirect('/')
                    }
                }
            })
        })


    app.route('/logout')
        .get((req, res) => {
            req.session.destroy();
            res.redirect('/')
        })


    app.route('*')
        .get((req, res) => {
            res.redirect('/')
        })
}
