const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bCrypt = require('bcrypt-nodejs');

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

module.exports = function(passport) {
    passport.use(
        'local-login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            (req, username, password, done) => {
                console.log(req);
                process.nextTick(() => {
                    User.findOne({ username: username.toLowerCase() }, (err, user) => {
                        console.log(username);
                        if (err) {
                            return done(err);
                        }

                        if (!user) {
                            return done(null, false, req.flash('loginMessage', 'No user found.'));
                        }

                        if (!isValidPassword(user, password)) {
                            console.log('Invalid Password');
                            return done(null, false, req.flash('loginMessage', 'Invalid Password'));
                        }
                        console.log('we good');
                        return done(null, user);
                    });
                });
            },
        ),
    );
};
