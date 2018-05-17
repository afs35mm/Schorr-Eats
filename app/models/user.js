const mongoose = require('mongoose');

mongoose.Promise = Promise;

module.exports = mongoose.createConnection(process.env.USERS_DB).model('User', {
    username: { type: String },
    shortName: { type: String },
    password: { type: String },
    prettyUsername: { type: String },
});
