var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logistic = new Schema({
    logisticID: {type:String, require:true, unique:true},
    date:{type:String, require:true},
    licencePlate:{type:String, require:true},
    invoice:[{ type: Schema.Types.ObjectId, ref: 'inovice'}]
}, {collection:'logistic'});

module.exports = mongoose.model('logistic', logistic)
