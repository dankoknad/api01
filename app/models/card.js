var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var cardSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Card', cardSchema);