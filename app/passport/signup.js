var LocalStrategy   = require('passport-local').Strategy;
const User = require('../models/user');
const bCrypt = require('bcrypt-nodejs');
const doubleSecretPassCode = process.env.DOUBLE_SECRET_PASSCODE;

function createHash(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

function makeSexyName(name){
    name = name.toLowerCase();
    var nameArr = name.split(' ');
    var totalString = '';
    nameArr.forEach(function(elm){
        capitalizedFirst = elm.charAt(0).toUpperCase() + elm.slice(1);
        totalString += capitalizedFirst + ' ';
    });
    return totalString.slice(0,-1);
};

module.exports = function(passport){
    passport.use('signup', new LocalStrategy({
            passReqToCallback : true, // allows us to pass back the entire request to the callback
            usernameField: 'email',
            passwordField: 'password'
        },
        function(req, username, password, done) {
            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'username' :  username.toLowerCase() }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // if (req.body.username === ''){
                    //      return done(null, false, req.flash('signupMessage','Username, password, or secret code are blank!'));
                    // }
                    if (req.body.code !== doubleSecretPassCode.passCode){
                         return done(null, false, req.flash('signupMessage','You\'re not a Schorr!'));
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('signupMessage','User With That Name Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.username = username.toLowerCase();
                        newUser.password = createHash(password);
                        newUser.shortName = req.body.name;
                        newUser.prettyUsername = makeSexyName(newUser.shortName);

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);
                                throw err;
                            }
                            console.log('User Registration succesful');
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );
};


