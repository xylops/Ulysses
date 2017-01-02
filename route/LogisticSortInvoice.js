var express = require('express');
var router = express.Router();
var client = require('../modal/client_model.js')
var invoice = require ('../modal/invoice_model')

router.get('/getNonProcessInvoice', function(req, res, next) {
    invoice.find({status:'未處理'}).populate('client').sort({id:1}).exec((err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result)
        }
    })
});

module.exports = router
