var express = require('express');
var router = express.Router();
// var moment = require('moment')
var client = require('../modal/client_model.js')
var invoiceRecord = require('../modal/invoice_model.js')

var accessControl = require('../service/invoiceAccess');

PDFDocument = require ('pdfkit')
var fs = require('fs')

router.get('/getAllInvoice', accessControl, function(req, res, next) {
    invoiceRecord.find({}).populate('client').sort({invoiceID:-1}).exec((err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
});

router.post('/getInvoice', accessControl, function(req, res, next) {
    if(req.query.skip === undefined){
        var skip = 0
    }else{
        var skip = Number(req.query.skip)
    }
    invoiceRecord.find({}, function(err, data){
        var length = data.length;
        invoiceRecord.find({}).sort({invoiceID: -1}).skip(skip).limit(15).populate('client').sort({invoiceID:-1}).exec((err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({result, length})
            }
        })
    })
});

router.post('/top10', function(req, res, next){

})

router.post('/filterInvoice', accessControl, function(req, res, next) {
    var searchText = req.query.searchText
    if(searchText != ""){
        invoiceRecord.find({invoiceID:{ "$regex": searchText}}).skip(0).limit(15).populate('client').sort({invoiceID:1}).exec((err, result)=>{
            res.json({result})
        })
    }else{
        invoiceRecord.find({}).skip(0).limit(15).populate('client').sort({invoiceID:1}).exec((err, result)=>{
            res.json({result})
        })
    }
});

router.post('/checkInvoicePerDay', accessControl, function(req, res, next) {
    var date = req.query.date
    invoiceRecord.find({date:date}, function(err, data){
        res.json({numberOfInvoice:data.length})
        console.log(data)
    })
});

router.post('/createNewInvoice', accessControl, function(req, res, next) {
    var invoice = JSON.parse(req.query.invoice);
    var newInvoiceRecord = new invoiceRecord()
    console.log(invoice)
    newInvoiceRecord.invoiceID = invoice.invoiceID;
    newInvoiceRecord.client = invoice.client._id
    newInvoiceRecord.date = invoice.date
    newInvoiceRecord.item = invoice.item
    newInvoiceRecord.total = invoice.total
    newInvoiceRecord.remark = invoice.remark
    newInvoiceRecord.status = '未處理'

    newInvoiceRecord.save((err, record)=>{
        if(err){
            res.json({message:'Something is wrong : ' + err})
        }else{
            client.findOneAndUpdate({
                id: invoice.client.id,
            }, {
                $push: {
                    purchaseRecord:record._id
                }
            },{upsert : true}, (err, data)=>{
                if(err){
                    res.json('Something is wrong '+ err)
                }else{
                    res.json({message:'New Invoice Record has been added to database'})
                }
            })

        }
    })
});

router.post('/voidInvoice', accessControl, function(req, res, next) {
    var invoiceID = req.query.invoiceID
    invoiceRecord.findOneAndUpdate({invoiceID}, {$set:{status:'VOID'}}, function(err, data){
        res.json({message:'Invoice ' + invoiceID + 'has been void'})
    })
});

router.post('/printInvoice', accessControl, function(req, res, next){
    var invoice = JSON.parse(req.query.invoice);
    var url = req.query.url
    doc = new PDFDocument({
      size: [612, 573]
    });

    doc.pipe (writeStream = fs.createWriteStream('public/node.pdf'))
    // doc.image('public/GloryInvoice.png', 0, 0, {width:612})

    //client Info
    doc.font('public/sharp.ttf')
        .fontSize(10)
        .text(invoice.client.name, 65, 145,  {width: 240, align: 'left'})
    doc.font('public/sharp.ttf')
        .fontSize(10)
        .text(invoice.client.address, 65, 160,  {width: 240, align: 'left'})
    doc.font('public/sharp.ttf')
        .fontSize(10)
        .text('Tel: ' + invoice.client.phone, 65, 200,  {width: 240, align: 'left'})
    doc.font('public/sharp.ttf')
        .fontSize(12)
        .text(invoice.client.delieverytime, 360, 217,  {width: 240, align: 'left'})
    doc.font('public/sharp.ttf')
        .fontSize(10)
        .text(invoice.client.paymentMethod, 390, 465,  {width: 70, align: 'center'})

    //Invoice Detail Section
    doc.font('public/sharp.ttf')
        .fontSize(10)
        .text(invoice.invoiceID, 510, 143, {width: 95, align: 'center'})
    doc.font('public/sharp.ttf')
        .fontSize(10)
        .text(invoice.client.id, 510, 165, {width: 95, align: 'center'})
    // var date = moment(invoice.date).format('DD/MM/YYYY')
    doc.font('public/sharp.ttf')
        .fontSize(10)
        .text(invoice.date, 510, 188, {width: 95, align: 'center'})
    doc.font('public/sharp.ttf')
        .fontSize(10)
        .text('$ ' + invoice.total, 520, 465, {width: 70, align: 'center'})
    doc.font('public/sharp.ttf')
        .fontSize(10)
        .text(invoice.remark, 110, 440 )

    //item section
    var height = 260
    invoice.item.forEach((item)=>{
        doc.font('public/sharp.ttf')
            .fontSize(10)
            .text(item.ProductID, 20, height, {width: 70, align: 'center'})
        if(item.Spec !== 'N/A'){
            doc.font('public/sharp.ttf')
                .fontSize(10)
                .text(item.ProductName  + ' - ' + item.Spec, 110, height, {width: 200, align: 'left'})
        }else{
            doc.font('public/sharp.ttf')
                .fontSize(10)
                .text(item.ProductName, 110, height, {width: 200, align: 'left'})
        }

        doc.font('public/sharp.ttf')
            .fontSize(10)
            .text(item.quantity, 315, height, {width: 70, align: 'center'})
        doc.font('public/sharp.ttf')
            .fontSize(10)
            .text(item.Price, 390, height, {width: 65, align: 'center'})
        doc.font('public/sharp.ttf')
            .fontSize(10)
            .text(item.discount, 460, height, {width: 45, align: 'center'})
        doc.font('public/sharp.ttf')
            .fontSize(10)
            .text('$ ' + item.amount, 520, height, {width: 70, align: 'center'})
        height = height + 15
    })

    doc.end();

    writeStream.on('finish', function(){

        var x = process.env.ENV_VARIABLE

        if(url === 'http://localhost:3000/#/IV' || url === 'http://localhost:3000/#/IS' ){
            res.json({link:'http://localhost:3000/node.pdf'})
        }else{
            res.json({link:'http://ulysses-xylops.herokuapp.com/node.pdf'})
        }
    })
})

module.exports = router;
