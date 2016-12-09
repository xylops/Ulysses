var express = require('express');
var router = express.Router();

router.get('/getOwnBrandList', function(req, res, next) {
    db.collection('products').find({OwnBrand:true}).sort({id:1}).toArray(function(err, results) {
        res.json(results)
    })
});

module.exports = router;
