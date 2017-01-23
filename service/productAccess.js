var accessControl = require('../modal/accessControl_model')
var logger = require('./logger')

module.exports= function(req, res, next){
    if(req.user === undefined){
        res.redirect('/')
    }else{
        var clearanceLevel = req.user.clearance;

        switch (req.route.path){
            case '/getFullProductData':
                var cate = 'pdRead';
                break
            case '/createNewProduct':
                var cate = 'pdWrite';
                break
            case '/updateProduct':
                var cate = 'pdEdit';
                break
            case '/deleteProduct':
                var cate = 'pdDelete';
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
