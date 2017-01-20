var mongoose = require('mongoose'),
    databaseUrl;

if(process.env.NODE_ENV === 'development') {
    // databaseUrl = require('../../config/database').users.url
    databaseUrl = 'mongodb://localhost/users';
} else {
    databaseUrl = require('../../config/database').users.url
}

var usersConn = mongoose.createConnection(databaseUrl);

module.exports = usersConn.model('User', {
    username : {type : String },
    shortName : {type : String },
    password : {type : String },
    prettyUsername : {type : String },
});
