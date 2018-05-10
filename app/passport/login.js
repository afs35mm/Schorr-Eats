var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

function isValidPassword (user, password){
    return bCrypt.compareSync(password, user.password);
};

module.exports = function(passport){
	passport.use('local-login', new LocalStrategy({
        passReqToCallback : true,
        usernameField: 'email',
        passwordField: 'password'
    },
    function(req, username, password, done) {
        process.nextTick(function() {
            User.findOne({ 'username' :  username.toLowerCase() }, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }

                if (!isValidPassword(user, password)){
                    console.log('Invalid Password');
                    return done(null, false, req.flash('loginMessage', 'Invalid Password'));
                } else {
                    return done(null, user);
                }
            });
        });
    }));

};