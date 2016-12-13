    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var inventorySchema = new Schema({
        stockLevel:Number
    }, {collection:'inventory'});

    module.exports = mongoose.model('inventoryModel', inventorySchema)
