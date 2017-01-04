var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lorry = new Schema({
    plate: {type:String, require:true, unique:true},
}, {collection:'lorry'});

module.exports = mongoose.model('lorry', lorry)
