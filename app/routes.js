const Restaurant = require('./models/restaurant');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;

function getRestaurants(res) {
    Restaurant.find((err, restaurants) => {
        if (err) {
            res.send(err);
        } else {
            res.json(restaurants);
        }
    });
}

function ensureAuthenticated(req, res, next) {
    req.isAuthenticated();
    return next();
}

module.exports = function(app, passport) {
    app.post(
        '/signup',
        passport.authenticate('signup', {
            successRedirect: '/',
            failureRedirect: '/signup',
            failureFlash: true,
        }),
    );

    app.get('/signup', (req, res) => {
        const messageBody = req.user ? "You're signed in already!" : req.flash('signupMessage');
        res.render('signup.ejs', {
            message: messageBody,
        });
    });

    app.post('/users/login', (req, res, next) => {
        passport.use(
            new LocalStrategy((username, password, done) => {
                console.log(username, password);
                User.findOne({ username }, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                });
            }),
        );
    });

    // app.post('/users/login', (req, res, next) => {
    //     passport.authenticate('local-login', (err, user, info) => {
    //         if (err) {
    //             return next(err);
    //         }
    //         if (!user) {
    //             return res.redirect('/login');
    //         }
    //         req.logIn(user, err => {
    //             if (err) {
    //                 return next(err);
    //             }
    //             return res.redirect(`/users/${user.username}`);
    //         });
    //     })(req, res, next);
    // });

    // app.post('/login', passport.authenticate('local', { successRedirect: '/',
    //                                                 failureRedirect: '/login' }));

    app.get('/api/restaurants', (req, res) => {
        getRestaurants(res);
    });

    app.post('/api/restaurant', (req, res) => {
        Restaurant.create(
            {
                name: req.body.name,
                location: req.body.location,
                cuisine: req.body.cuisine,
                dateReadable: req.body.date,
                date: new Date(Date.parse(req.body.date)),
                ratings: [
                    {
                        author: req.body.user,
                        notes: req.body.comments,
                        rating: req.body.rating,
                    },
                ],
            },
            (err, restaurant) => {
                if (err) {
                    res.send(err);
                }
                getRestaurants(res);
            },
        );
    });

    app.delete('/api/restaurants/:id', (req, res) => {
        Restaurant.remove(
            {
                _id: req.params.id,
            },
            (err, restaurant) => {
                if (err) {
                    res.send(err);
                } else {
                    getRestaurants(res);
                }
            },
        );
    });

    app.put('/api/restaurants/:id', (req, res) => {
        Restaurant.findOne({ _id: req.body._id }, (err, data) => {
            if (data) {
                const isUpdatingExistingReview = false;
                for (const i = 0; i < data.ratings.length; i++) {
                    if (data.ratings[i].author === req.body.author) {
                        isUpdatingExistingReview = true;
                        const reviewIdx = i;
                        break;
                    }
                }

                // new review, push to array
                if (!isUpdatingExistingReview) {
                    data.ratings.push({
                        author: req.body.author,
                        rating: req.body.currentUserRating.rating,
                        notes: req.body.currentUserRating.notes,
                    });
                    // updating, update to reviewIdx
                } else {
                    const updatingReview = data.ratings[reviewIdx];
                    updatingReview.notes = req.body.currentUserRating.notes;
                    updatingReview.rating = req.body.currentUserRating.rating;
                }

                data.location = req.body.location;
                data.name = req.body.name;
                data.cuisine = req.body.cuisine;
                data.dateReadable = req.body.dateReadable;
                data.date = new Date(Date.parse(req.body.dateReadable));

                const options = {
                    upsert: false,
                    // multi: true,
                };
                Restaurant.update(
                    {
                        _id: req.params.id,
                    },
                    {
                        $set: data,
                    },
                    options,
                    (err, restaurant) => {
                        if (err) {
                            res.send(err);
                        } else {
                            getRestaurants(res);
                        }
                    },
                );
            } else {
                res.status(500).send({
                    error: err,
                });
            }
        });
    });

    app.get('/api/restaurants/:id', (req, res) => {
        Restaurant.findOne({ _id: req.params.id }, (err, restaurant) => {
            if (err) {
                console.log('error occured in the database');
            }
            res.json(restaurant);
        });
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/', ensureAuthenticated, (req, res) => {
        res.render('index.ejs', {
            user: req.user,
            message: req.flash('loginMessage'),
        });
    });
};
