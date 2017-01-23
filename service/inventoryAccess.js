var accessControl = require('../modal/accessControl_model')
var logger = require('./logger')

module.exports= function(req, res, next){
    if(req.user === undefined){
        res.redirect('/')
    }else{
        var clearanceLevel = req.user.clearance;

        switch (req.route.path){
            case '/getOwnBrandList':
                var cate = 'imRead';
                break
            case '/allProductLevel':
                var cate = 'imRead';
                break
            case '/createAndEditInstockList':
                var cate = 'imWrite';
                break
            case '/deleteInventoryRecord':
                var cate = 'imEdit';
                break
            case '/getDateInstockList':
                var cate = 'imRead';
                break
        }

        accessControl.findOne({role:clearanceLevel}, function(err, data){
            if(data.permission[cate]){
                next()
            }else{
                logger.warn(req.user.username + ' -- ' + req.route.path + ' -- Permission Decline')
                res.json({message:'Premission Decline'})
            }
        })
    }
}
