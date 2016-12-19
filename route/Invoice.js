var express = require('express');
var router = express.Router();
var client = require('../modal/client_model.js')
var invoice = require('../modal/invoice_model.js')

router.post('/checkInvoicePerDay', function(req, res, next) {
    var date = req.query.date
    invoice.find({date:date}, function(err, data){
        res.json({numberOfInvoice:data.length})
        console.log(data.length)
    })
});

module.exports = router;
