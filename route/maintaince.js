var express = require('express');
var router = express.Router();
var async = require('async')
var client = require('../modal/client_model.js')
var invoice = require ('../modal/invoice_model')
var logistic = require('../modal/logistic_model')
var lorry = require('../modal/lorry_model')
var productDetail = require('../modal/productDetail_model')

router.get('/actions', function(req, res, next) {
    client.find({}, function(err, clients){
        clients.forEach((cli)=>{
            client.findOneAndUpdate({_id:cli._id}, {$set:{purchaseRecord:[]}}, {upsert:true}, function(err, data){
                if(err){
                    console.log(err)
                }else{
                    console.log('done')
                }
            })
        })
    })
});

module.exports = router
