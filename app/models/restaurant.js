var mongoose = require('mongoose');

if (global.ENV === 'development') {
	var devDb = require('../../config/database_DEV').resturants.url;
	var restaurantDbUrl = 'mongodb://localhost/' + devDb;	
}else{
	var restaurantDbUrl = require('../../config/database').resturants.url;	
}

var restaurantsConn = mongoose.createConnection(restaurantDbUrl);

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