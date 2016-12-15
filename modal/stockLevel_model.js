    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var stockLevelSchema = new Schema({
        stockLevel:Number
    }, {collection:'stockLevel'});

    module.exports = mongoose.model('stockLevelModel', stockLevelSchema)
