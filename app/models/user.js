var mongoose = require('mongoose');
var database = require('../../config/database');

var restaurantsConn = mongoose.createConnection('mongodb://localhost/' + database.resturants.url);

module.exports = mongoose.model('User', {
    username : {type : String },
    password : {type : String },
});