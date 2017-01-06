var express = require('express');
var router = express.Router();
var async = require('async')
var client = require('../modal/client_model.js')
var invoice = require ('../modal/invoice_model')
var logistic = require('../modal/logistic_model')
var lorry = require('../modal/lorry_model')
var productDetail = require('../modal/productDetail_model')

router.get('/getPickList', function(req, res, next) {
    //create an array filter logistic record include ownbrand product and  return their quantity need
    logistic.find({}).populate('invoice').exec((err, result)=>{
        var RCP = []
        //look for each logistic record if any of it's invoice contain
        //processing it will push it RCP (Result Contain Processing)
        async.forEach(result, (record, callback)=>{
            async.forEach(record.invoice, (invoice, callback2)=>{
                if(invoice.status === '處理中' && RCP.indexOf(record) === -1){
                    RCP.push(record)
                }
            })
            callback()
        }, function(err,x){
            var pickList = [] //new pickList
            console.log(RCP)
            async.forEach(RCP, (record, cb)=>{
                //new record
                var newLogisticPickRecord = {
                    logisticID : record.logisticID,
                    date : record.date,
                    licencePlate: record.licencePlate,
                    item:[]
                }
                //for each record find invoice which their status contaion 處理中
                async.forEach(record.invoice, (invoice, cb2)=>{
                    if(invoice.status === '處理中'){
                        //for each 處理中 invoice , find product which are own brand
                        async.forEach(invoice.item, (product, cb3)=>{
                            productDetail.findOne({_id:product.id}, function(err, prod){
                                if(prod.OwnBrand === true){
                                    // then push it to new record item(line24)
                                    var tempItem = {
                                        id: product.id,
                                        ProductID: product.ProductID,
                                        ProductName : product.ProductName,
                                        Quantity: product.quantity,
                                    }
                                    newLogisticPickRecord.item.push(tempItem)
                                }
                                cb3();
                            })
                        }, (err)=>{
                            //push the new record to pick list
                            cb2()
                        })
                    }
                },(err)=>{
                    //empty callback


                    pickList.push(newLogisticPickRecord)
                    cb()
                })
            }, (err)=>{
                res.json(pickList)
            })
        })
    })
});

module.exports = router
