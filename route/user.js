var express = require('express');
var fs=require('fs');
var router = express.Router();
var user = require('../modal/user_model')
var jwt = require('jwt-simple');
var config = require('../config')
var passportService = require('../service/passport')
var passport = require('passport');


var requireSignin = passport.authenticate('local', {session:false});


function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat:timestamp }, config.secret);
}


router.post('/createUsers', function(req, res, next) {
    var id = req.body.id;
    var pw = req.body.pw;
    var pw2 = req.body.pw2;

    if(id !== '' && pw !== '' && pw2 !== ''){
        if(pw !== pw2){
            res.json({res: 'Fail password and confirm password are not the same'})
        }else{
            user.findOne({userID: id}, function(err, data){
                if(data === null){
                    var newUser = new user();
                    newUser.userID = id;
                    newUser.password = pw;
                    newUser.save((err, result)=>{
                        if(err){
                            res.json({res:'DB error'});
                        }else{
                            res.json({token: tokenForUser(newUser)})
                        }
                    });
                }else{
                    res.json({res:'User ID have been taken'})
                }
            });
        }
    }else{
        res.json({res: 'User, Password and Comfirm Password are required!'})
    }
});

router.post('/login',  function(req, res, next) {
    var id = req.body.id;
    var pw = req.body.pw;

    if(id !== '' && pw !== ''){
        user.findOne({userID:id}, function(err, user){
            if(err){return res.json({res:err})}
            if(!user){return res.json({res:'Invalid User name and Password'})}
            //compare password
            user.comparePassword(pw, function(err, isMatch){
                if(err){return res.json({res:err})}
                if(!isMatch){return res.json({res:'Invalid User name and Password'})}
                // return res.json({token: tokenForUser(user), address:'http://localhost.com/system.html'})
                // res.set('Content-Type', 'application/x-www-form-urlencoded');
                // res.set('authorization', tokenForUser(user));
                // res.send(fs.readFileSync(__dirname+'/../public/system.html','utf8'));
                res.cookie('authorization', tokenForUser(user));
                // res.end('woo')
                res.redirect('/system.html')

            })
        })

    }else{
        res.json({res: 'User and Password are required!'})
    }
});

module.exports = router
