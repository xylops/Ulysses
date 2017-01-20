var express = require('express');
var router = express.Router();
var User = require('../modal/user_model')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//register
router.get('/register', function(req, res){
    res.render('register');
});

//login
router.get('/login', function(req, res){
    res.render('login');
});

//register
router.post('/register', function(req, res){
    var id = req.body.id;
    var pw = req.body.pw;
    var pw2 = req.body.pw2;
    // validation
    req.checkBody('id', 'ID is require').notEmpty();
    req.checkBody('pw', 'Password is require').notEmpty();
    req.checkBody('pw2', 'Confirm Password is require').equals(req.body.pw);

    var errors = req.validationErrors();
    if(errors){
        res.render('register', {
            errors:errors
        })
    }else{
        var newUser = new User({
            username:id,
            password:pw
        })
        User.createUser(newUser, function(err, user){
            if(err){return err}
            console.log(user);
        })
        req.flash('success_msg', 'Your are new Register and can now login');
        res.redirect('/users/login')
    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserById(username, function(err, user){
            if(err) throw err;

            if(!user){
              return done(null, false,{message:'Unknown User'});
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user)
                    console.log('password matches')

                }else{
                    return done(null, false, {message:'Invalid password'});
                }
            })
        })
    }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
    passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash: true}),
    function(req, res) {
        console.log('working')
        res.redirect('/');
    });

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login')
})
module.exports = router;
