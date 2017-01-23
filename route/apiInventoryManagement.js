var express = require('express');
var moment = require('moment')
var router = express.Router();
var async = require('async')
var logger = require('../service/logger')
var stockLevel = require('../modal/stockLevel_model.js')
var inventoryRecord = require('../modal/inventoryRecord_model.js')
var productDetail = require('../modal/productDetail_model.js')

var accessControl = require('../service/inventoryAccess')


router.get('/getOwnBrandList', accessControl, function(req, res, next) {
    productDetail.find({OwnBrand:true}).sort({id:1}).exec((err, result)=>{
        if(err){
            logger.warn(req.user.username + ' -- ' + err)
        }else{
            logger.info(req.user.username + ' -- has request OwnBrand List')
            res.json(result);
        }
    })
});

router.get('/allProductLevel', accessControl, function(req, res, next) {
    productDetail.find({}).populate('Inventory').exec(function(err, doc){
        if(err){
            console.log(err)
        }else{
            var json = [];
            doc.forEach(function(elem){
                console.log(elem)
                json.push({
                    _id: elem._id,
                    productID:elem.ProductID,
                    name: elem.ProductName,
                    stockLevel: elem.Inventory
                })
            })
            logger.info(req.user.username + ' -- has request all product level List')
            res.json (json);
        }
    })
});

router.post('/createAndEditInstockList', accessControl, function(req, res, next) {

    var instockList = req.query.list;
    var date = req.query.date;


    instockList.forEach(function(elem){
        var CurrentStockLevel = undefined;
        var obj = JSON.parse(elem);

        inventoryRecord.find({Date:date,  RealPID: obj.id}, function(err, item){
            if(item.length === 1 && item[0].StockLevelChanges === obj.amount){

                //if date product id and stock level are the same
                console.log('all are the same')

            }else if(item.length === 1 && item[0].StockLevelChanges !== obj.amount){

                //if date, product id are the same but level are different
                var different = obj.amount - item[0].StockLevelChanges
                stockLevel.findOneAndUpdate({_id:obj.inventory},{$inc:{stockLevel:different}}, function(err, data){
                    logger.info(req.user.username + ' -- has update ' + item[0].ProductName + ' stock level from ' + item[0].StockLevelChanges  + ' to ' + obj.amount )
                })
                inventoryRecord.findOneAndUpdate(
                    {Date:date,  RealPID: obj.id},
                    {$inc:{StockLevelChanges:different}},
                    function(err, data){
                    logger.info(req.user.username + ' -- has update inventory Record database of ' + item[0].ProductName + ' on ' + item[0].cts)
                } )

            }else if(item.length === 0){

                //if there are new items
                stockLevel.findOneAndUpdate({_id:obj.inventory},{$inc:{stockLevel:obj.amount}}, function(err, data){
                    CurrentStockLevel = data.stockLevel + Number(obj.amount);
                    logger.info(req.user.username + ' -- has increase ' + item.ProductName +' stock level by'  + obj.amount )
                })
                var newInventoryRecord = new inventoryRecord()

                newInventoryRecord.ProductID = obj.productID;
                newInventoryRecord.ProductName = obj.name;
                newInventoryRecord.StockLevelChanges = obj.amount;
                newInventoryRecord.CurrentStockLevel = CurrentStockLevel;
                newInventoryRecord.Date = date;
                newInventoryRecord.RealPID = obj.id;
                newInventoryRecord.StockLevelID = obj.inventory;

                newInventoryRecord.save((err, record)=>{
                    if(err){
                        res.json({message:'Something is wrong : ' + err})
                    }else{
                        logger.info(req.user.username + ' -- create new Inventory Record on product ' + obj.name + ' by ' + date)
                    }
                });
            }
        })
    })
    res.json({message:'Instock List has been added to database'})
});

router.post('/deleteInventoryRecord', accessControl, function(req, res, next) {
    var date = req.query.date
    var id = req.query.id
    var inventory = req.query.inventoryID
    inventoryRecord.find({Date:date,  RealPID: id}, function(err, data){
        if(data.length > 0){
            var removeItem = -data[0].StockLevelChanges
            console.log(inventory)
            stockLevel.findOneAndUpdate({_id:inventory},{$inc:{stockLevel:removeItem}}, function(err, data){
                logger.warn(req.user.username + ' -- have trigger delete inventory record')
            })
            inventoryRecord.findOneAndRemove(
                {Date:date,  RealPID: id},
                function(err, data){
                logger.warn(req.user.username + ' -- have trigger delete inventory record')

            } )

        }else{
            logger.warn(req.user.username + ' -- have trigger delete inventory record')

        }
        res.json({message:'item has been delete from db'})
    })

});

router.post('/getDateInstockList', accessControl, function(req, res, next) {
    inventoryRecord.find({Date:req.query.date},function(err,dataList){
        var tempArray = []
        async.forEach(dataList, (record, cb)=>{
            if(record.StockLevelChanges >= 0 ){
                tempArray.push(record)
            }
            cb()
        }, (err)=>{
            logger.info(req.user.username + ' --  have request get InStock list on date ' + req.query.date)
            res.json(tempArray)
        })
    })
});


router.post('/getInventoryRecord', function(req, res, next) {
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;

    inventoryRecord.find({ Date: { $gte: startDate, $lte: endDate }}, function (err, records) {
        logger.info(req.user.username + ' -- have request inventory record from ' + startDate + ' to ' + endDate)
         res.json(records)
    });
});




module.exports = router;
