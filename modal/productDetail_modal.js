var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productDetail = new Schema({
    ProductID:{type:String,unique:true, require:true},
    ProductName:{type:String, require:true},
    Spec:String,
    Price:String,
    Unit:String,
    OwnBrand:Boolean
}, {collection:'products'});

module.exports = mongoose.model('productDetail', productDetail)
