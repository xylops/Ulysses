var express = require('express');
var router = express.Router();

router.get('/getFullClientData', function(req, res, next) {
    db.collection('client').find().sort({id:1}).toArray(function(err, results) {
        res.json(results)
    })
});

router.post('/createNewClient', function(req, res, next) {

    var id = req.query.newClient[0];
    var name = req.query.newClient[1]
    var address = req.query.newClient[2];
    var phone = req.query.newClient[3];
    var delieverytime = req.query.newClient[4];

    // console.log(ProductID, ProductName, Spec, Price, Unit)
    console.log('create new product : ' + req.query.newClient)
    db.collection('client').insert(
        {
            id,
            name,
            address,
            phone,
            delieverytime
        }, function(err, data){
            res.json({message:'Client ' + name + ' have been added to database'})
        }
    )
});


router.post('/updateClient', function(req, res, next){

    var input = {
        ID: req.query.ID,
    }
    console.log( "Update Client : " + req.query.UpdatedClient)
    db.collection('client').update(
        {
            id: req.query.UpdatedClient[0],
        }, {
            $set: {
                name : req.query.UpdatedClient[1],
                address : req.query.UpdatedClient[2],
                phone : req.query.UpdatedClient[3],
                delieverytime : req.query.UpdatedClient[4]
            }
        }, function(err, data){
            res.json({message:"Client " + req.query.UpdatedClient[1] + " has been Updated"})
        }
    )
})

router.post('/deleteClient', function(req, res, next){
    var input = {
        ID: req.query.ID,
    }
    console.log('Delete Client: ' + input.ID)
    db.collection('client').deleteOne(
        {
            id : input.ID,
        }, function(err, data){
            res.json({message:"Client have been delete from database"})
        }
    )
})



module.exports = router;
