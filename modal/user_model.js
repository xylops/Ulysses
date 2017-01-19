var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var userSchema = new Schema({
    userID:{type:String, require:true, unquie:true},
    password: {type:String, require: true}
}, {collection:'user'});

// on save hook
userSchema.pre('save', function(next){
    const user = this;

    bcrypt.genSalt(10, function(err, salt){
        if(err){return next(err)}
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err){return next(err);}

            user.password = hash;
            next()
        });
    });
})

userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err){return callbackk(err)}
        callback(null, isMatch)
    })
}

module.exports = mongoose.model('user', userSchema);
