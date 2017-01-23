var accessControl = require('../modal/accessControl_model')
var logger = require('./logger')

module.exports= function(req, res, next){
    if(req.user === undefined){
    }else{
        var clearanceLevel = req.user.clearance;

        switch (req.route.path){
            case '/getFullClientData':
                var cate = 'cmRead';
                break
            case '/filterClient':
                var cate = 'cmRead';
                break
            case '/createNewClient':
                var cate = 'cmWrite';
                break
            case '/updateClient':
                var cate = 'cmEdit';
                break
            case '/deleteClient':
                var cate = 'cmDelete';
                break;
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
