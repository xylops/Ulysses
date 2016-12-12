var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var client = new Schema({
    id:String,
    name:String,
    phone:String,
    address:String,
    Unit:String,
    delievreytime:String
}, {collection:'client'});

module.exports = mongoose.model('client', client)
