var mongoose = require('mongoose');
var database = require('../../config/database');

var restaurantsConn = mongoose.createConnection('mongodb://localhost/' + database.resturants.url);

module.exports = restaurantsConn.model('Restaurant', new mongoose.Schema ({
	text : {type : String, default: ''},
	location : {type : String, default: ''},
}));
