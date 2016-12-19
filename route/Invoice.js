var express = require('express');
var router = express.Router();
var client = require('../modal/client_model.js')

router.post('/findClient', function(req, res, next) {
    var filter = JSON.parse(req.query.searchFilter)
    console.log(filter)
    client.find(filter, function(err, cli){
        res.json(cli)
        console.log(cli)
    })
});

module.exports = router;
