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
        passport.authenticate('local-login', (err, user, info) => {
            if (err) {
                return res.status(500).json({});
            }
            if (!user) {
                return res.status(401).json({
                    message: 'Invalid email and/or password combination',
                });
            }
            req.login(user, err => {
                if (err) {
                    return res.status(500).json({
                        message: "Something is'nt right... ",
                    });
                }
                return res.status(200).json(user);
            });
        })(req, res, next);
    });

    app.get('/api/restaurants', (req, res) => {
        getRestaurants(res);
    });

    app.post('/api/restaurant', (req, res) => {
        const reqInfo = {
            name: req.body.name,
            location: req.body.location,
            cuisine: req.body.cuisine,
            dateReadable: req.body.dateReadable,
            date: req.body.date,
            ratings: [
                {
                    author: req.body.user,
                    notes: req.body.comments,
                    rating: req.body.rating,
                },
            ],
        };
        Restaurant.create(reqInfo, (err, restaurant) => {
            if (err) {
                return res.status(500).json({});
            }
            return res.status(200).json({});
        });
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
        let user;
        if (req.user) {
            const { prettyUsername, shortName, username } = req.user;
            user = {
                prettyUsername,
                shortName,
                username,
            };
        }
        res.render('index.ejs', {
            bootstrap: {
                user,
            },
        });
    });
};
