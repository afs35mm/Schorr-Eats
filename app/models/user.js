var mongoose = require('mongoose');
var database = require('../../config/database');

var usersConn = mongoose.createConnection(database.users.url);

module.exports = usersConn.model('User', {
    username : {type : String },
    shortName : {type : String },
    password : {type : String },
    prettyUsername : {type : String },
});