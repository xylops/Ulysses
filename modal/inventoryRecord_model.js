var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventoryRecordSchema = new Schema({
    ProductID:{type:String,require:true},
    ProductName:{type:String, require:true},
    StockLevelChanges:{type:Number, require:true},
    Date:{type:Number, require:true},
    RealPID:{type:String, require:true},
    StockLevelID:{type:String, require:true}
}, {collection:'inventoryRecord'});

module.exports = mongoose.model('inventoryRecordModel', inventoryRecordSchema)
