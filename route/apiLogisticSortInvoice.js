var express = require('express');
var router = express.Router();
var async = require('async')
var logger = require('../service/logger')
var client = require('../modal/client_model.js')
var invoice = require ('../modal/invoice_model')
var logistic = require('../modal/logistic_model')
var lorry = require('../modal/lorry_model')
var productDetail = require('../modal/productDetail_model')

var accessControl = require('../service/logisticSIAccess')

router.get('/getNonProcessInvoice', accessControl, function(req, res, next) {
    invoice.find({$or:[ {'status':''}, {'status':'未處理'}]}).populate('client').sort({id:1}).exec((err, result)=>{
        if(err){
            logger.warn(req.user.username + ' -- ' + err)
        }else{
            logger.info(req.user.username + '-- request NonProcess Invoice')
            res.json(result)
        }
    })
});

router.post('/checkLogisticPerDay', accessControl, function(req, res, next) {
    var date = req.query.date
    logistic.find({date:date}, function(err, data){
        logger.info(req.user.username + '-- request logistic record per day')
        res.json({numberOfLogistic:data.length})
    })
});

router.get('/getLicencePlate', accessControl, function(req, res, next) {
    lorry.find({}).exec((err, result)=>{
        if(err){
            logger.warn(req.user.username + ' -- ' + err)
        }else{
            logger.info(req.user.username + '-- request licence Plate')
            res.json(result)
        }
    })
});

router.post('/createNewLogistic', accessControl, function(req, res, next) {
    var record = JSON.parse(req.query.record);

    var newLogisticRecord = new logistic();
    newLogisticRecord.logisticID = record.logisticID;
    newLogisticRecord.date = record.date;
    newLogisticRecord.licencePlate = record.licencePlate;
    newLogisticRecord.invoice = record.invoice;

    //check each logistic invoicce
    async.forEach(record.invoice, (elem, cb)=>{
        invoice.findOne({_id:elem}, function(err, data){
            if(err){
                console.log(err)
            }else{
                var tempArray = []
                async.forEach(data.item, (item, callback)=>{
                    productDetail.findOne({_id:item.id}, function(err, prod){
                        if(prod.OwnBrand){
                            tempArray.push('1')
                        }
                        callback()
                    })
                }, function(err){
                    if(tempArray.length > 0 ){
                        invoice.findOneAndUpdate({_id:elem},{$set:{
                            status:'處理中'
                        }},{upsert : true}, function(err, data){
                            if(err){
                                logger.warn(req.user.username + ' -- ' + err)
                            }else{
                                logger.info(req.user.username + ' -- invoice ' + data.invoiceID + ' have been update to processing' )
                            }
                        })
                    }else{
                        invoice.findOneAndUpdate({_id:elem},{$set:{
                            status:'己執未送'
                        }},{upsert : true}, function(err, data){
                            if(err){
                                logger.warn(req.user.username + ' -- ' + err)
                            }else{
                                logger.info(req.user.username + ' -- invoice ' + data.invoiceID + ' have been update to Picked' )
                            }
                        })
                    }
                    tempArray = [];
                    cb();
                })
            }
        })
    }, function(err){
        newLogisticRecord.save((err, record)=>{
            if(err){
                res.json({message:'Something is wrong : ' + err})
            }else{
                logger.info(req.user.username + 'logistic Record ' + record.logisticID+ ' has been created' )
                res.json({message:'New Logistic Record have been created'})
            }
        })
    })

});

module.exports = router
