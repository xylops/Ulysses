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
    console.log(req.query.invoice)
    var invoice = JSON.parse(req.query.invoice);
    var newInvoiceRecord = new invoiceRecord()

    newInvoiceRecord.invoiceID = invoice.invoiceID;
    newInvoiceRecord.clientID = invoice.client._id
    newInvoiceRecord.date = invoice.date
    console.log(newInvoiceRecord)
});


module.exports = router;
