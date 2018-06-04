const fs = require('fs');
const utils = require('./utils');
const Restaurant = require('./models/restaurant');
const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const imagesDirName = utils.formatNameForDir(req.body.name);
        const dir = `public/images/${imagesDirName}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        if (typeof req.body.images === 'undefined') {
            req.body.images = {};
        }

        if (typeof req.body.images.imagesDirName === 'undefined') {
            req.body.images.imagesDirName = imagesDirName;
        }
        cb(null, dir);
    },
    filename(req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        if (typeof req.body.images.imageFileNames === 'undefined') {
            req.body.images.imageFileNames = [];
        }
        req.body.images.imageFileNames.push(fileName);
        cb(null, fileName);
    },
});
const upload = multer({ storage });

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
        })
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

    app.post('/api/restaurant', upload.array('imgs[]', 25), (req, res) => {
        const reqInfo = {
            name: req.body.name,
            location: req.body.location,
            cuisine: req.body.cuisine,
            dateReadable: req.body.dateReadable,
            date: req.body.date,
            ratings: [
                {
                    author: req.body.user,
                    notes: req.body.notes,
                    rating: req.body.rating,
                },
            ],
        };
        // we're trying to add more images
        if (typeof req.body.images !== 'undefined') {
            const { imagesDirName, imageFileNames } = req.body.images;
            reqInfo.imagesDirName = imagesDirName;
            reqInfo.imageFileNames = imageFileNames;
        }
        Restaurant.create(reqInfo, (err, restaurant) => {
            if (err) {
                console.log(err);
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
            }
        );
    });

    app.put('/api/restaurant/:id', upload.array('imgs[]', 25), (req, res) => {
        Restaurant.findOne({ _id: req.params.id }, (err, data) => {
            // TODO so much logic, put in seperate method
            if (data) {
                let isUpdatingExistingReview = false;
                let reviewIdx;
                if (data.ratings === null) data.ratings = []; // fuck
                for (let i = 0; i < data.ratings.length; i++) {
                    if (data.ratings[i].author === req.body.user) {
                        isUpdatingExistingReview = true;
                        reviewIdx = i;
                        break;
                    }
                }

                if (req.body.rating.trim()) {
                    // new review, push to array
                    if (!isUpdatingExistingReview) {
                        data.ratings.push({
                            author: req.body.user,
                            rating: req.body.rating,
                            notes: req.body.notes,
                        });
                        // updating, update to reviewIdx
                    } else {
                        const updatingReview = data.ratings[reviewIdx];
                        updatingReview.notes = req.body.notes;
                        updatingReview.rating = req.body.rating;
                    }
                }

                const { location, name, cuisine, date } = req.body;

                // we're trying to add more images
                if (typeof req.body.images !== 'undefined') {
                    const { imagesDirName, imageFileNames } = req.body.images;
                    data.imagesDirName = imagesDirName;
                    data.imageFileNames = data.imageFileNames.concat(imageFileNames);
                }

                if (req.body.imgsToDelete) {
                    const imgsToDelete = JSON.parse(req.body.imgsToDelete);
                    if (imgsToDelete.length) {
                        data.imageFileNames = data.imageFileNames.filter(
                            img => !imgsToDelete.includes(img)
                        );
                        // remove from filesystem
                        const dirName = utils.formatNameForDir(req.body.name);
                        imgsToDelete.forEach(imgToDelete => {
                            fs.unlink(`public/images/${dirName}/${imgToDelete}`, err => {
                                if (err && err.code === 'ENOENT') {
                                    console.info("File doesn't exist, won't remove it.");
                                } else if (err) {
                                    // other errors, e.g. maybe we don't have enough permission
                                    console.error('Error occurred while trying to remove file');
                                } else {
                                    console.info(`removed`);
                                }
                            });
                        });
                    }
                }
                // TODO deal with name of restaurant changes :/

                data.location = location;
                data.name = name;
                data.cuisine = cuisine;
                data.date = date;

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
                            // meh
                            return res.status(200).json({});
                        }
                    }
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
