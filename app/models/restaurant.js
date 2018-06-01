const mongoose = require('mongoose');

mongoose.Promise = Promise;

const ratingsSchema = new mongoose.Schema({
    author: {
        type: String,
    },
    notes: {
        type: String,
    },
    rating: {
        type: Number,
    },
});
module.exports = mongoose.createConnection(process.env.RESTAURANTS_DB).model(
    'Restaurant',
    new mongoose.Schema({
        name: {
            type: String,
            default: '',
        },
        location: {
            type: String,
            default: '',
        },
        cuisine: {
            type: String,
            default: '',
        },
        rating: {
            type: Number,
        },
        date: {
            type: Date,
            default: '',
        },
        imagesDirName: {
            type: String,
            default: '',
        },
        imageFileNames: {
            type: Array,
            default: [],
        },
        ratings: [ratingsSchema],
    })
);
