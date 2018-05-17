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
                process.nextTick(() => {
                    User.findOne({ username: username.toLowerCase() }, (err, user) => {
                        if (err) {
                            return done(err);
                        }
                        if (!user) {
                            return done(null, false, req.flash('loginMessage', 'No user found.'));
                        }
                        if (!isValidPassword(user, password)) {
                            return done(null, false, req.flash('loginMessage', 'Invalid Password'));
                        }
                        return done(null, user);
                    });
                });
            },
        ),
    );
};
