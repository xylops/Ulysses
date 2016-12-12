var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventorySchema = new Schema({
    product:{ type: Schema.ObjectId, ref: 'productDetail' },
    stockLevel:Number
}, {collection:'inventory'});

module.exports = mongoose.model('inventory', inventorySchema)
