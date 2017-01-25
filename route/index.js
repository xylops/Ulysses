var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
var logger = require('../service/logger')

// var DB_URL = 'mongodb://users:1234@ds147995.mlab.com:47995/ulysses-data';
var DB_URL = 'mongodb://xylops:xxxx@ds113608.mlab.com:13608/ulysses';


mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, (err, database)=>{
    if (err) return logger.error(err)
    db = database;
    logger.info('connnect to db through mongoose');
})

router.get('/', ensureAuthenticated, function(req, res){
    logger.info(req.user.username + ' -- has login')
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
