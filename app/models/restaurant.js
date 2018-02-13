var mongoose = require('mongoose'),
	restaurantDbUrl;

if(process.env.NODE_ENV === 'development') {
	databaseUrl = 'mongodb://localhost/restaurants1';
} else {
	restaurantDbUrl = require('../../config/database').restaurants.url;
}

var restaurantsConn = mongoose.createConnection(restaurantDbUrl);

var ratingsSchema = new mongoose.Schema ({
	author: {type: String },
	notes: {type: String },
	rating: {type: Number },
});

module.exports = restaurantsConn.model('Restaurant', new mongoose.Schema ({
	name: {type: String, default: ''},
	location: {type: String, default: ''},
	cuisine: {type: String, default: ''},
	rating: {type: Number},
	date: {type: Date, default: ''},
	dateReadable: {type: String, default: ''},
	ratings: [ratingsSchema],
}));
