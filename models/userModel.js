var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var userModel = new Schema({
    name: String,
    password: String,
    admin: Boolean
});

module.exports = mongoose.model('User', userModel);