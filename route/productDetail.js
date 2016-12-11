var express = require('express');
var router = express.Router();
var productDetail = require('../modal/productDetail_modal.js')


router.get('/getFullProductData', function(req, res, next) {
    // db.collection('products').find().sort({ProductID:1}).toArray(function(err, results) {
    //     res.json(results)
    // })
    productDetail.find({}).sort({ProductID:1}).exec((err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
});

router.post('/createNewProduct', function(req, res, next) {

    var ProductID = req.query.newProduct[0];
    var ProductName = req.query.newProduct[1]
    var Spec = req.query.newProduct[2];
    var Price = req.query.newProduct[3];
    var Unit = req.query.newProduct[4];
    if(req.query.newProduct[5] === 'true'){
        var OwnBrand = true;
        console.log('set to true')
    }else{
        var OwnBrand = false;
        console.log('set to false')
    }


    // console.log(ProductID, ProductName, Spec, Price, Unit)
    console.log('create new product : ' + req.query.newProduct)
    db.collection('products').insert(
        {
            ProductID,
            ProductName,
            Spec,
            Price,
            Unit,
            OwnBrand
        }, function(err, data){
            res.json({message:'Item ' + ProductName + ' have been added to database'})
        }
    )
});


router.post('/deleteProduct', function(req, res, next){
    var input = {
        ID: req.query.ID,
    }
    console.log('Delete Product: ' + input.ID)
    db.collection('products').deleteOne(
        {
            ProductID: input.ID,
        }, function(err, data){
            res.json({message:"Product have been delete from database"})
        }
    )
})

router.post('/updateProduct', function(req, res, next){

    if(req.query.UpdatedProduct[5] === 'true'){
        var OwnBrand = true;
        console.log('set to true')
    }else{
        var OwnBrand = false;
        console.log('set to false')
    }

    console.log( "Update Product : " + req.query.UpdatedProduct)
    db.collection('products').update(
        {
            ProductID: req.query.UpdatedProduct[0],
        }, {
            $set: {
                ProductName : req.query.UpdatedProduct[1],
                Spec : req.query.UpdatedProduct[2],
                Price : req.query.UpdatedProduct[3],
                Unit : req.query.UpdatedProduct[4],
                OwnBrand : OwnBrand
            }
        }, function(err, data){
            res.json({message:"Product " + req.query.UpdatedProduct[1] + " have been Updated"})
        }
    )
})


module.exports = router;
