var express = require('express');
var router = express.Router();
var inventory = require('../modal/inventory_modal.js')
var productDetail = require('../modal/productDetail_modal.js')


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

    instockList.forEach(function(item){
        var obj = JSON.parse(item);
        console.log(obj.inventory + " " + obj.name + " " + obj.amount)
    })

    // var newClient = new client();
    //
    // newClient.id = req.query.newClient[0];
    // newClient.name = req.query.newClient[1]
    // newClient.address = req.query.newClient[2];
    // newClient.phone = req.query.newClient[3];
    // newClient.delieverytime = req.query.newClient[4];
    //
    // newClient.save((err, client)=>{
    //     if(err){
    //         res.json({message:'Something is wrong : ' + err})
    //     }else{
    //         console.log('New Client Created: ' + newClient)
            res.json({message:'Instock List has been added to database'})
    //     }
    // });
});


module.exports = router;
