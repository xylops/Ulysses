var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accessControl = new Schema({
    role:{type:String, default:'unclass'},
    permission:{
        cmRead: Boolean,
        cmWrite: Boolean,
        cmEdit: Boolean,
        imRead: Boolean,
        imWrite: Boolean,
        imEdit: Boolean,
        ivRead: Boolean,
        ivWrite: Boolean,
        ivEdit: Boolean,
        lgdrRead: Boolean,
        lgdrEdit:Boolean,
        lgplRead:Boolean,
        lgplEdit:Boolean,
        lgsiRead: Boolean,
        lgsiEdit: Boolean,
        pdRead: Boolean,
        pdWrite:Boolean,
        pdEdit: Boolean,
        repRead: Boolean
    }
}, {collection:'accessControl'});

module.exports = mongoose.model('accessControl', accessControl)
