var passport = require('passport');
var user = require('../modal/user_model');
var config = require('../config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local')

//create local Strategy
// var localOptions = {usernameField: id}
var localLogin = new LocalStrategy({}, function(userID, password, done){
    // verify this username and password, call done with the user
    // if it is the correct username and password,
    // otherwise call done with false
    user.findOne({userID:userID}, function(err, user){
        if(err){return done(err)}
        if(!user){return done(null, false)}
        //compare password
        user.comparePassword(password, function(err, isMatch){
            if(err){return done(err)}
            if(!isMatch){return(done(null, false))}
            return done(null, user)
        })
    })
})

//setup options for JWT Strategy
var jwtOptions = {
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey : config.secret
};

// create JWt Strategy
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    //see if the user id in the payload exist in out DB
    // if it does call done with that other
    //otherwise, call done without a user object
    user.findById(payload.sub, function(err, user){
        if(err){return done(err, false);}
        if(user){
            done(null, user);
        }else{
            done(null, false);
        }
    })
})


//tell Passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
