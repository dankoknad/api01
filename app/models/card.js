var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var cardSchema   = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Card', cardSchema);