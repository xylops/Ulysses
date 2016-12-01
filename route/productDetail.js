var express = require('express');
var router = express.Router();

router.get('/getFullProductData', function(req, res, next) {
    db.collection('products').find().toArray(function(err, results) {
        res.json(results)
    })
});

router.post('/createNewProduct', function(req, res, next) {
    console.log(req.query.newProduct)
    var ProductID = req.query.newProduct[0];
    var ProductName = req.query.newProduct[1]
    var Spec = req.query.newProduct[2];
    var Price = req.query.newProduct[3];
    var Unit = req.query.newProduct[4];

    console.log(ProductID, ProductName, Spec, Price, Unit)

    db.collection('products').insert(
        {
            ProductID,
            ProductName,
            Spec,
            Price,
            Unit
        }
    )
});

module.exports = router;
