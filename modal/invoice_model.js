var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invoice = new Schema({
    invoiceID: {type:String, require:true, unique:true},
    clientID:{ type: Schema.Types.ObjectId, ref: 'client'},
    purchaseItem: [],
    totalAmount: {type:Number, require:true},
    date:{type:String, require:true},
    remark:{type:String, default:'N/A'},
    status:{type:String, default:'未處理'}
}, {collection:'invoice'});

module.exports = mongoose.model('invoice', invoice)
