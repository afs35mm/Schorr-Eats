var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

function isValidPassword (user, password){
    return bCrypt.compareSync(password, user.password);
};

module.exports = function(passport){

	passport.use('local-login', new LocalStrategy({
        passReqToCallback : true, // allows us to pass back the entire request to the callback
        usernameField: 'email',
        passwordField: 'password'
    }, 
    function(req, username, password, done) {
        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'username' :  username.toLowerCase() }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                // if (!user.validPassword(password))
                //     return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                if (!isValidPassword(user, password)){
                    console.log('Invalid Password');
                    return done(null, false, req.flash('loginMessage', 'Invalid Password')); // redirect back to login page
                }
                
                // all is well, return user
                else{
                    return done(null, user);
                }
            });
        });
    }));

};