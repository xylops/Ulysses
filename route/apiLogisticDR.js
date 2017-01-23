var express = require('express');
var router = express.Router();
var async = require('async')
var logger = require('../service/logger')
var invoice = require ('../modal/invoice_model')

var accessControl = require('../service/logisticDRAccess')


router.get('/getPickNotComplete', accessControl, function(req, res, next) {
    invoice.find({status:'己執未送'}).populate('client').sort({id:1}).exec((err, result)=>{
        if(err){
            logger.warn(req.user.username + ' -- ' + err)
        }else{
            logger.info(req.user.username + '-- have request invoice to be reConfirm')
            res.json(result)
        }
    })
});

router.post('/reConfirmReturn', accessControl, function(req, res, next) {
    var record = JSON.parse(req.query.record);
    invoice.findOneAndUpdate({_id:record._id}, {
        $set:{status:'己完成'}
    },{upsert:true}, function(err, data){
        logger.info(req.user.username + 'have update invoice ' + record.invoiceID + ' status to Completed' )
        res.json({message:'Database Updated'})
    })
});

module.exports = router
