var express = require('express');
var router = express.Router();
var async = require('async')
var client = require('../modal/client_model.js')
var invoice = require ('../modal/invoice_model')
var logistic = require('../modal/logistic_model')
var lorry = require('../modal/lorry_model')
var productDetail = require('../modal/productDetail_model')
var stockLevel = require('../modal/stockLevel_model')

PDFDocument = require ('pdfkit')
var fs = require('fs')

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

router.post('/pdf', function(req, res, next) {
    doc = new PDFDocument({
      size: [612, 573]
    });
    doc.pipe (writeStream = fs.createWriteStream('public/node1.pdf'))
    doc.text ('Hello world!', 100, 100)
    doc.text ('測試', 100, 100)

    // doc.font('public/fonts/SHARP.ttf')
    //     .fontSize(10)
    //     .text('testing', 65, 145,  {width: 240, align: 'left'})

    doc.end();

    writeStream.on('finish', function(){
         res.json({link:'http://localhost:3000/node1.pdf'})
    })
});

module.exports = router
