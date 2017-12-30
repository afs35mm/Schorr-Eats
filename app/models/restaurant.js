var mongoose = require('mongoose'),
	restaurantDbUrl;

console.log('NODE_ENV:', process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
	restaurantDbUrl = 'mongodb://localhost/restaurants';
} else {
	restaurantDbUrl = require('../../config/database').restaurants.url;
}
console.log(`restaurant url is ${restaurantDbUrl}`);
var restaurantsConn = mongoose.connect(restaurantDbUrl);

var ratingsSchema = new mongoose.Schema({
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
