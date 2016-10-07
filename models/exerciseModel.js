var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var exerciseModel = new Schema({
    name: String,
    description: String,
    url: String
});

module.exports = mongoose.model('Exercise', exerciseModel);