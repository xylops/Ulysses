var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');

var DB_URL = 'mongodb://xylops:xxxx@ds113608.mlab.com:13608/ulysses'
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, (err, database)=>{
    if (err) return console.log(err)
    db = database;
    console.log('connnect to db through mongoose')
})

router.get('/', function(req, res){
    res.render('index');
});


module.exports = router;
