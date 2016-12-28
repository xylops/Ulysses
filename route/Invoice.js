var express = require('express');
var router = express.Router();
// var moment = require('moment')
var client = require('../modal/client_model.js')
var invoiceRecord = require('../modal/invoice_model.js')

PDFDocument = require ('pdfkit')
var fs = require('fs')

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
            doc = new PDFDocument({
              size: [612, 573]
            });

            doc.pipe (writeStream = fs.createWriteStream('public/node.pdf'))
            // doc.image('public/GloryInvoice.png', 0, 0, {width:612})

            //client Info
            doc.font('fonts/SHARP.ttf')
                .fontSize(10)
                .text(invoice.client.name, 65, 145,  {width: 240, align: 'left'})
            doc.font('fonts/SHARP.ttf')
                .fontSize(10)
                .text(invoice.client.address, 65, 160,  {width: 240, align: 'left'})
            doc.font('fonts/SHARP.ttf')
                .fontSize(10)
                .text('Tel: ' + invoice.client.phone, 65, 200,  {width: 240, align: 'left'})
            doc.font('fonts/SHARP.ttf')
                .fontSize(12)
                .text(invoice.client.delieverytime, 360, 217,  {width: 240, align: 'left'})
            doc.font('fonts/SHARP.ttf')
                .fontSize(10)
                .text(invoice.client.paymentMethod, 390, 465,  {width: 70, align: 'center'})

            //Invoice Detail Section
            doc.font('fonts/SHARP.ttf')
                .fontSize(10)
                .text(newInvoiceRecord.invoiceID, 510, 143, {width: 95, align: 'center'})
            doc.font('fonts/SHARP.ttf')
                .fontSize(10)
                .text(invoice.client.id, 510, 165, {width: 95, align: 'center'})
            // var date = moment(invoice.date).format('DD/MM/YYYY')
            doc.font('fonts/SHARP.ttf')
                .fontSize(10)
                .text(invoice.date, 510, 188, {width: 95, align: 'center'})
            doc.font('fonts/SHARP.ttf')
                .fontSize(10)
                .text('$ ' + invoice.total, 520, 465, {width: 70, align: 'center'})
            doc.font('fonts/SHARP.ttf')
                .fontSize(10)
                .text(newInvoiceRecord.remark, 110, 440 )

            //item section
            var height = 260
            invoice.item.forEach((item)=>{
                doc.font('fonts/SHARP.ttf')
                    .fontSize(10)
                    .text(item.ProductID, 20, height, {width: 70, align: 'center'})
                if(item.Spec !== 'N/A'){
                    doc.font('fonts/SHARP.ttf')
                        .fontSize(10)
                        .text(item.ProductName  + ' - ' + item.Spec, 110, height, {width: 200, align: 'left'})
                }else{
                    doc.font('fonts/SHARP.ttf')
                        .fontSize(10)
                        .text(item.ProductName, 110, height, {width: 200, align: 'left'})
                }

                doc.font('fonts/SHARP.ttf')
                    .fontSize(10)
                    .text(item.quantity, 315, height, {width: 70, align: 'center'})
                doc.font('fonts/SHARP.ttf')
                    .fontSize(10)
                    .text(item.Price, 390, height, {width: 65, align: 'center'})
                doc.font('fonts/SHARP.ttf')
                    .fontSize(10)
                    .text(item.discount, 460, height, {width: 45, align: 'center'})
                doc.font('fonts/SHARP.ttf')
                    .fontSize(10)
                    .text('$ ' + item.amount, 520, height, {width: 70, align: 'center'})
                height = height + 15
            })

            doc.end();
            writeStream.on('finish', function(){
                 res.json({link:'http://localhost:3000/node.pdf', message:'New Invoice Record has been added to database'})
            })
    //     }
    // })


});


module.exports = router;
