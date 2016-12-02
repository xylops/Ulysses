var express = require('express');
var router = express.Router();

router.get('/getFullProductData', function(req, res, next) {
    db.collection('products').find().toArray(function(err, results) {
        res.json(results)
    })
});

router.post('/createNewProduct', function(req, res, next) {

    var ProductID = req.query.newProduct[0];
    var ProductName = req.query.newProduct[1]
    var Spec = req.query.newProduct[2];
    var Price = req.query.newProduct[3];
    var Unit = req.query.newProduct[4];

    // console.log(ProductID, ProductName, Spec, Price, Unit)
    console.log('create new product : ' + req.query.newProduct)
    db.collection('products').insert(
        {
            ProductID,
            ProductName,
            Spec,
            Price,
            Unit
        }, function(err, data){
            res.json({updatedProduct:true})
        }
    )
});


router.post('/deleteProduct', function(req, res, next){
    var input = {
        ID: req.query.ID,
    }
    console.log('Delete : ' + input.ID)
    db.collection('products').deleteOne(
        {
            ProductID: input.ID,
        }
    )
})

router.post('/updateProduct', function(req, res, next){
    console.log( req.query.UpdatedProduct)
    var input = {
        ID: req.query.ID,
    }

    db.collection('products').update(
        {
            ProductID: req.query.UpdatedProduct[0],
        }, {
            $set: {
                ProductName : req.query.UpdatedProduct[1],
                Spec : req.query.UpdatedProduct[2],
                Price : req.query.UpdatedProduct[3],
                Unit : req.query.UpdatedProduct[4]
            }
        }
    )
})


module.exports = router;
