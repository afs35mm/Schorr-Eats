var mongoose = require('mongoose'),
    databaseUrl;

if(process.env.NODE_ENV === 'development') {
    databaseUrl = 'mongodb://localhost/users';
} else {
    console.log(require('../../config/database').users);
    databaseUrl = require('../../config/database').users.url
}

var usersConn = mongoose.createConnection(databaseUrl);

module.exports = usersConn.model('User', {
    username : {type : String },
    shortName : {type : String },
    password : {type : String },
    prettyUsername : {type : String },
});
