var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');

var DB_URL = 'mongodb://xylops:xxxx@ds113608.mlab.com:13608/ulysses'
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, (err, database)=>{
    if (err) return console.log(err)
    db = database;
    console.log('connnect to db through mongoose');
})

router.get('/', ensureAuthenticated, function(req, res){
    res.render('index', {
        username: req.user.username,
        clearance: req.user.clearance
    })
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        // req.flash('error_msg', 'You are not Logged In');
        res.redirect('/users/login');
    }
}

module.exports = router;
