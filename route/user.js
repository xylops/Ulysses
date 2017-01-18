var express = require('express');
var router = express.Router();

router.post('/createUsers', function(req, res, next) {
    console.log(req.body)
    res.json({result:'working'})
});

module.exports = router
