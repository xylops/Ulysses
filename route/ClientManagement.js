var express = require('express');
var router = express.Router();

router.get('/getFullClientData', function(req, res, next) {
    db.collection('client').find().sort({id:1}).toArray(function(err, results) {
        res.json(results)
    })
});



module.exports = router;
