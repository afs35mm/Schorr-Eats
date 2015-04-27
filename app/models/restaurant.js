var mongoose = require('mongoose');
var database = require('../../config/database');

var restaurantsConn = mongoose.createConnection('mongodb://localhost/' + database.resturants.url);

var ratingsSchema = new mongoose.Schema ({
	author : { type: String },
	notes  : { type: String },
	rating : { type: Number },
});

module.exports = restaurantsConn.model('Restaurant', new mongoose.Schema ({
	name     : {type : String, default: ''},
	location : {type : String, default: ''},
	cuisine  : {type : String, default: ''},
	rating   : {type : Number},
	ratings  : [ ratingsSchema ],

}));