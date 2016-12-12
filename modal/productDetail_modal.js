var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productDetailSchema = new Schema({
    ProductID:{type:String,unique:true, require:true},
    ProductName:{type:String, require:true},
    Spec:String,
    Price:String,
    Unit:String,
    OwnBrand:Boolean,
    Inventory:{ type: Schema.ObjectId, ref: 'inventory'}
}, {collection:'products'});

module.exports = mongoose.model('productDetail', productDetailSchema)
