var express = require('express');
var router = express.Router();
var client = require('../modal/client_model.js')
var invoice = require ('../modal/invoice_model')

router.get('/getFullClientData', function(req, res, next) {
    client.find({}).populate('purchaseRecord').sort({id:1}).exec((err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result);
        }
    })
});

router.post('/createNewClient', function(req, res, next) {

    var newClient = new client();

    newClient.id = req.query.newClient[0];
    newClient.name = req.query.newClient[1]
    newClient.address = req.query.newClient[2];
    newClient.phone = req.query.newClient[3];
    newClient.delieverytime = req.query.newClient[4];
    newClient.paymentMethod = req.query.newClient[5]
    newClient.location = req.query.newClient[6];

    newClient.save((err, client)=>{
        if(err){
            res.json({message:'Something is wrong : ' + err})
        }else{
            console.log('New Client Created: ' + newClient)
            res.json({message:'Client ' + req.query.newClient[1] + ' have been added to database'})
        }
    });
});

router.post('/deleteClient', function(req, res, next){

    client.findOneAndRemove({
        id: req.query.ID
    }, (err, data)=>{
        if(err){
            res.json({message:'Something is wrong : ' + err})
        }else{
            console.log('Client '+ req.query.ID +' has been Deleted')
            res.json({message:"Client "+  req.query.ID +" have been delete from database"})
        }

    })

})

router.post('/updateClient', function(req, res, next){
    client.findOneAndUpdate({
        id: req.query.UpdatedClient[0],
    }, {
        $set: {
            name : req.query.UpdatedClient[1],
            address : req.query.UpdatedClient[2],
            phone : req.query.UpdatedClient[3],
            delieverytime : req.query.UpdatedClient[4],
            location : req.query.UpdatedClient[5],
            paymentMethod : req.query.UpdatedClient[6]
        }
    },{upsert : true}, (err, data)=>{
        if(err){
            res.json('Something is wrong '+ err)
        }else{
            console.log('Client '+ req.query.UpdatedClient[1] +' has been Updated')
            res.json({message:"Client " + req.query.UpdatedClient[1] + " have been Updated"})
        }
    })

})





module.exports = router;
