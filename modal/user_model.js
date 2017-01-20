var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:String,
    password:String,
    clearance: String
}, {collection:'user'});

var Users = module.exports = mongoose.model('user', userSchema)

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}

module.exports.getUserById = function(id, callback){
    var query = {username:id}
    Users.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
};
