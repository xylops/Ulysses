var express = require('express');
var router = express.Router();
var async = require('async')
var client = require('../modal/client_model.js')
var invoice = require ('../modal/invoice_model')
var logistic = require('../modal/logistic_model')
var lorry = require('../modal/lorry_model')
var productDetail = require('../modal/productDetail_model')
var stockLevel = require('../modal/stockLevel_model')

//clearing all purchase record
router.get('/clearClientPurchaseRecord', function(req, res, next) {
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

//set all product stock level to 0
router.get('/clearStockLevel', function(req, res, next) {
    stockLevel.find({}, function(err, result){
        result.forEach((item)=>{
            stockLevel.findOneAndUpdate({_id:item._id}, {$set:{stockLevel:0}}, {upsert:true}, function(err, data){
                if(err){
                    console.log(err)
                }else{
                    console.log('done')
                }
            })
        })
    })
});

//setting all own brand item stock level to 999
router.get('/setOwnBrandStockLevel', function(req, res, next) {
    productDetail.find({OwnBrand:true}, function(err, result){
        result.forEach((item)=>{
            stockLevel.findOneAndUpdate({_id:item.Inventory}, {$set:{stockLevel:999}}, {upsert:true}, function(err, data){
                if(err){
                    console.log(err)
                }else{
                    console.log('Update Own Brand')
                }
            })
        })
    })
});

module.exports = router
