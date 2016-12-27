var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invoice = new Schema({
    invoiceID: {type:String, require:true, unique:true},
    clientID:{ type: Schema.Types.ObjectId, ref: 'client'},
    purchaseItem: [],
    totalAmount: {type:Number, require:true},
    date:{type:String, require:true},
    remark:{type:String},
    status:{type:String}
}, {collection:'invoice'});

module.exports = mongoose.model('invoice', invoice)
