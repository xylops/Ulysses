var express = require('express');
var router = express.Router();
var client = require('../modal/client_model.js')
var invoiceRecord = require('../modal/invoice_model.js')

var pdf = require('pdfkit');
var fs = require('fs');

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
    //
    // newInvoiceRecord.save((err, record)=>{
    //     if(err){
    //         res.json({message:'Something is wrong : ' + err})
    //     }else{
    //         console.log('record created')
    //         res.json({message:'New Invoice Record has been added to database'})
    //     }
    // })
    var myDoc = new pdf

    myDoc.pipe(writeStream = fs.createWriteStream('public/node.pdf'));

    myDoc.font('Times-Roman')
        .fontSize(20)
        .text('InvoiceID : ' + newInvoiceRecord.invoiceID, 100, 100)
    myDoc.font('fonts/SHARP.ttf')
        .fontSize(20)
        .text(newInvoiceRecord.remark, 0, 0)
    var height = 150
    invoice.item.forEach((item)=>{

        myDoc.font('fonts/SHARP.ttf')
            .fontSize(10)
            .text(item.ProductID, 50, height)
        myDoc.font('fonts/SHARP.ttf')
            .fontSize(10)
            .text(item.ProductName, 140, height)
        myDoc.font('fonts/SHARP.ttf')
            .fontSize(10)
            .text(item.Spec, 290, height)
        myDoc.font('fonts/SHARP.ttf')
            .fontSize(10)
            .text(item.quantity, 365, height)
        myDoc.font('fonts/SHARP.ttf')
            .fontSize(10)
            .text(item.Price, 390, height)
        myDoc.font('fonts/SHARP.ttf')
            .fontSize(10)
            .text(item.discount, 440, height)
        myDoc.font('fonts/SHARP.ttf')
            .fontSize(10)
            .text(item.amount, 490, height)
        height = height + 15
        console.log(height)
    })



    myDoc.end();
    writeStream.on('finish', function(){
        console.log('done')
    })

});


module.exports = router;
