var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invoice = new Schema({
    invoiceID: {type:String, require:true, unique:true},
    clientID:{type:String, require:true},
    purchaseItem: [[Schema.Types.ObjectId, Number]],
    totalAmount: {type:Number, require:true},
    date:{type:String, require:true}
}, {collection:'invoice'});

module.exports = mongoose.model('invoice', invoice)
