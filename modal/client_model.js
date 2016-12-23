var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var client = new Schema({
    id:{type:String,unique:true, require:true},
    name:{type:String, require:true},
    phone:String,
    address:String,
    delievreytime:String,
    paymentMethod:{type:String, default:'null'}
}, {collection:'client'});

module.exports = mongoose.model('client', client)
