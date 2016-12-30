var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var client = new Schema({
    id:{type:String,unique:true, require:true},
    name:{type:String, require:true},
    phone:{type:String, default:'null'},
    address:{type:String, default:'null'},
    delieverytime:{type:String, default:'null'},
    paymentMethod:{type:String, default:'null'},
    location:{type:String, default:'N/A'},
    purchaseRecord:[{ type: Schema.Types.ObjectId, ref: 'invoice'}]
}, {collection:'client'});

module.exports = mongoose.model('client', client)
