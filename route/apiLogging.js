var express = require('express');
var router = express.Router();
var logger = require('../service/logger');
var winston = require('winston')

router.post('/queryLog', function(req, res, next){
    var options = JSON.parse(req.query.queryLog)
    logger.query(options, function (err, results) {
      if (err) {
        throw err;
      }
      res.json(results)
    });
})

module.exports = router;
