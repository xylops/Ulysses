var express = require('express');
var router = express.Router();
var productDetail = require('../modal/productDetail_model.js')
var stockLevel = require('../modal/stockLevel_model.js')

var accessControl = require('../service/productAccess')

router.get('/getFullProductData', accessControl, function(req, res, next) {
    productDetail.find({}).sort({ProductID:1}).exec((err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
});

router.post('/createNewProduct', accessControl, function(req, res, next) {

    var newProduct = new productDetail();

    newProduct.ProductID = req.query.newProduct[0];
    newProduct.ProductName = req.query.newProduct[1]
    newProduct.Spec = req.query.newProduct[2];
    newProduct.Price = req.query.newProduct[3];
    newProduct.Unit = req.query.newProduct[4];
    newProduct.OwnBrand = req.query.newProduct[5]

    newProduct.save((err, product)=>{
        if(err){
            res.json({message:'Something is wrong : ' + err})
        }else{
            //when new prodduct is has been create
            var newInventory = new stockLevel();

            newInventory.stockLevel = 0;

            newInventory.save((err, newInventory)=>{
                if(!err){
                    productDetail.findOneAndUpdate({ProductID:newProduct.ProductID},{
                        $set:{
                            Inventory : newInventory._id
                        }
                    }, function(err, data){
                        // finish push a Inventory ID to PD
                        console.log('New Product & stockLevel Created')
                        res.json({message:'Item ' + newProduct.ProductName + ' have been added to database'})
                    })
                }//end if !err
            })// end stockLevel save
        }
    })//end createNewProduct
});


router.post('/deleteProduct', accessControl, function(req, res, next){
    productDetail.findOne({ProductID:req.query.ID}, function(err, singleProduct){
        stockLevel.findOneAndRemove({_id:singleProduct.Inventory}, (err, data)=>{
            if(err){console.log(err)}else{
                console.log('Inventory Delete')
            }
        })
    })

    productDetail.findOneAndRemove({
        ProductID: req.query.ID
    }, (err, data)=>{
        if(err){
            res.json({message:'Something is wrong : ' + err})
        }else{
            console.log('Product '+ req.query.ID +' has been Deleted')
            res.json({message:"Product "+  req.query.ID +" have been delete from database"})
        }
    })
})

router.post('/updateProduct', accessControl, function(req, res, next){
    productDetail.findOneAndUpdate({
        ProductID: req.query.UpdatedProduct[0]
    }, {
        $set: {
            ProductName : req.query.UpdatedProduct[1],
            Spec : req.query.UpdatedProduct[2],
            Price : req.query.UpdatedProduct[3],
            Unit : req.query.UpdatedProduct[4],
            OwnBrand : req.query.UpdatedProduct[5]
        }
    },{upsert : true}, (err, data)=>{
        if(err){
            res.json('Something is wrong '+ err)
        }else{
            console.log('Product '+ req.query.UpdatedProduct[1] +' has been Updated')
            res.json({message:"Product " + req.query.UpdatedProduct[1] + " have been Updated"})
        }
    })
})



module.exports = router;
