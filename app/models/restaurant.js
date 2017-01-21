var mongoose = require('mongoose'),
	restaurantDbUrl;

console.log('NODE_ENV:', process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
	if (process.env.USER_DB === 'mod') {
		restaurantDbUrl = require('../../config/database').resturantsMod.url;
		console.log('This is the Modulus.io DB!!!', restaurantDbUrl);
	} else if (process.env.USER_DB === 'do') {
		restaurantDbUrl = require('../../config/database').resturantsDo.url;
		console.log('This is the digital Ocean DB');
	} else {
		var devDb = require('../../config/database_DEV').resturants.url;
		restaurantDbUrl = 'mongodb://localhost/' + devDb;
		console.log('this is the local DB!!!');
		console.log(restaurantDbUrl);
	}
} else {
	restaurantDbUrl = require('../../config/database').resturantsMod.url;
}


var restaurantsConn = mongoose.createConnection(restaurantDbUrl);

var ratingsSchema = new mongoose.Schema ({
	author : { type: String },
	notes  : { type: String },
	rating : { type: Number },
});

module.exports = restaurantsConn.model('Restaurant', new mongoose.Schema ({
	name     : {type: String, default: ''},
	location : {type: String, default: ''},
	cuisine  : {type: String, default: ''},
	rating   : {type: Number},
	dateAdded: {type: Date, default: ''},
	ratings  : [ ratingsSchema ],
}));
