var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productDetail = require('./productDetail_modal.js')

var inventory = new Schema({
    ProductID:{ type : Schema.ObjectId, ref : 'productDetail'},
    stockLevel:Number
}, {collection:'inventory'});

module.exports = mongoose.model('inventory', inventory)
