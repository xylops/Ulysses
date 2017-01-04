var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logistic = new Schema({
    logisticID: {type:String, require:true, unique:true},
    date:{type:String, require:true}
}, {collection:'logistic'});

module.exports = mongoose.model('logistic', logistic)
