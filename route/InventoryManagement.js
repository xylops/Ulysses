var express = require('express');
var router = express.Router();
var stockLevel = require('../modal/stockLevel_model.js')
var inventoryRecord = require('../modal/inventoryRecord_model.js')
var productDetail = require('../modal/productDetail_model.js')


router.get('/getOwnBrandList', function(req, res, next) {
    productDetail.find({OwnBrand:true}).sort({id:1}).exec((err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result);
        }
    })
});

router.get('/allProductLevel', function(req, res, next) {
    productDetail.find({}).populate('Inventory').exec(function(err, doc){
        if(err){
            console.log(err)
        }else{
            var json = [];
            doc.forEach(function(elem){
                json.push({
                    _id: elem._id,
                    productID:elem.ProductID,
                    name: elem.ProductName,
                    stockLevel: elem.Inventory.stockLevel
                })
            })
            res.json (json);
        }
    })
});

router.post('/createInstockList', function(req, res, next) {

    var instockList = req.query.list;
    var date = req.query.date;


    instockList.forEach(function(elem){
        var CurrentStockLevel = undefined;
        var obj = JSON.parse(elem);

        inventoryRecord.find({Date:date,  RealPID: obj.id}, function(err, item){
            if(item.length === 1 && item[0].StockLevelChanges === obj.amount){
                console.log('all are the same')
            }else if(item.length === 1 && item[0].StockLevelChanges !== obj.amount){
                var different = obj.amount - item[0].StockLevelChanges
                console.log(different)
                stockLevel.findOneAndUpdate({_id:obj.inventory},{$inc:{stockLevel:different}}, function(err, data){
                    console.log('Stock Level Updated')
                })

                inventoryRecord.findOneAndUpdate(
                    {Date:date,  RealPID: obj.id},
                    {$inc:{StockLevelChanges:different}},
                    function(err, data){
                    console.log('Inventory Record Updated')
                } )
            }else if(item.length === 0){
                stockLevel.findOneAndUpdate({_id:obj.inventory},{$inc:{stockLevel:obj.amount}}, function(err, data){
                    CurrentStockLevel = data.stockLevel + Number(obj.amount);
                    console.log('Product Stock Level Updated')
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
                        console.log('New Inventory Record Created')
                    }
                })
            }
        })
    })
    res.json({message:'Instock List has been added to database'})
});

router.post('/getDateInstockList', function(req, res, next) {
    inventoryRecord.find({Date:req.query.date},function(err,dataList){
        res.json(dataList)
    })
});

module.exports = router;
