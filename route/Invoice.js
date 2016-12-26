var express = require('express');
var router = express.Router();
var client = require('../modal/client_model.js')
var invoiceRecord = require('../modal/invoice_model.js')

router.post('/checkInvoicePerDay', function(req, res, next) {
    var date = req.query.date
    invoiceRecord.find({date:date}, function(err, data){
        res.json({numberOfInvoice:data.length})
        console.log(data.length)
    })
});

router.post('/createNewInvoice', function(req, res, next) {
    var invoice = JSON.parse(req.query.invoice);
    var newInvoiceRecord = new invoiceRecord()

    newInvoiceRecord.invoiceID = invoice.invoiceID;
    newInvoiceRecord.clientID = invoice.client._id
    newInvoiceRecord.date = invoice.date
    newInvoiceRecord.purchaseItem = invoice.item
    newInvoiceRecord.totalAmount = invoice.total
    newInvoiceRecord.remark = invoice.remark

    newInvoiceRecord.save((err, record)=>{
        if(err){
            res.json({message:'Something is wrong : ' + err})
        }else{
            console.log('record created')
            res.json({message:'New Invoice Record has been added to database'})
        }
    })

});


module.exports = router;
