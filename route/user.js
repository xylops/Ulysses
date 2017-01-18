var express = require('express');
var router = express.Router();

router.post('/createUsers', function(req, res, next) {
    console.log(req.body)
    res.json({result:req.body.id})
});

module.exports = router
