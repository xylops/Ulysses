var express = require('express');
var router = express.Router();
var inventory = require('../modal/inventory_modal.js')
var productDetail = require('../modal/productDetail_modal.js')


router.get('/getOwnBrandList', function(req, res, next) {
    productDetail.find({OwnBrand:true}).sort({id:1}).exec((err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result);
        }
    })
});


router.get('/allProductLevel', function(req, res, next) {
    inventory.find({}).sort({id:1}).populate('productDetail').exec((err, data))
});



module.exports = router;
