var accessControl = require('../modal/accessControl_model')
var logger = require('./logger')

module.exports= function(req, res, next){
    if(req.user === undefined){
        res.redirect('/')
    }else{
        var clearanceLevel = req.user.clearance;

        switch (req.route.path){
            case '/getNonProcessInvoice':
                var cate = 'lgsiRead';
                break
            case '/checkLogisticPerDay':
                var cate = 'lgsiRead';
                break
            case '/getLicencePlate':
                var cate = 'lgsiRead';
                break
            case '/createNewLogistic':
                var cate = 'lgsiEdit';
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
