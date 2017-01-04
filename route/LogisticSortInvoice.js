var express = require('express');
var router = express.Router();
var client = require('../modal/client_model.js')
var invoice = require ('../modal/invoice_model')
var logistic = require('../modal/logistic_model')
var lorry = require('../modal/lorry_model')

router.get('/getNonProcessInvoice', function(req, res, next) {
    invoice.find({status:'未處理'}).populate('client').sort({id:1}).exec((err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result)
        }
    })
});

router.post('/checkLogisticPerDay', function(req, res, next) {
    var date = req.query.date
    logistic.find({date:date}, function(err, data){
        res.json({numberOfLogistic:data.length})
    })
});

router.get('/getLicencePlate', function(req, res, next) {
    lorry.find({}).exec((err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result)
        }
    })
});

module.exports = router
