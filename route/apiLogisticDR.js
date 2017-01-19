var express = require('express');
var router = express.Router();
var async = require('async')
var invoice = require ('../modal/invoice_model')


router.get('/getPickNotComplete', function(req, res, next) {
    invoice.find({status:'己執未送'}).populate('client').sort({id:1}).exec((err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result)
        }
    })
});

router.post('/reConfirmReturn', function(req, res, next) {
    var record = JSON.parse(req.query.record);
    invoice.findOneAndUpdate({_id:record._id}, {
        $set:{status:'己完成'}
    },{upsert:true}, function(err, data){
        res.json({message:'Database Updated'})
    })
});

module.exports = router
