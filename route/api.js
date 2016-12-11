var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');

// MongoClient.connect('mongodb://xylops:xxxx@ds113608.mlab.com:13608/ulysses', (err, database) => {
//     if (err) return console.log(err)
//     db = database
//     console.log('connected to db')
// })

var DB_URL = 'mongodb://xylops:xxxx@ds113608.mlab.com:13608/ulysses'
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, (err, database)=>{
    if (err) return console.log(err)
    db = database;
    console.log('connnect to db through mongoose')
})

// router.post('/insert', function(req, res, next){
//     console.log(req.query)
//     var movieData = {
//         "title": req.query.title,
//         "genre": req.query.genre
//     }
//     console.log(movieData)
//     db.collection('movies').insert(
//        {
//           title: movieData.title,
//           genre: movieData.genre
//        }
//     )
// })
//
// router.post('/update', function(req, res, next){
//     var x = {
//         "title": "Mr & Mrs Smith",
//     }
//     db.collection('movies').update(
//        {
//           title: x.title,
//       },{
//         $set:{
//            title:'Love Letter'
//         }
//       }
//     )
// })
//
// router.post('/delete', function(req, res, next){
//     var input = {
//         "title": "Up",
//     }
//     db.collection('movies').deleteOne(
//        {
//           title: input.title,
//       }
//     )
// })


module.exports = router;
