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
    productDetail.find({}).populate('Inventory').exec(function(err, doc){
        if(err){
            console.log(err)
        }else{
            var json = [];
            doc.forEach(function(elem){
                json.push({
                    _id: elem._id,
                    productID:elem.ProductID,
                    name: elem.ProductName,
                    stockLevel: elem.Inventory.stockLevel
                })
            })
            res.json (json);
        }
    })
});

module.exports = router;
