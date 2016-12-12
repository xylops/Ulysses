var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productDetail = new Schema({
    ProductID:String,
    ProductName:String,
    Spec:String,
    Price:String,
    Unit:String,
    OwnBrand:Boolean
}, {collection:'products'});

module.exports = mongoose.model('productDetail', productDetail)
