var accessControl = require('../modal/accessControl_model')
var logger = require('./logger')

module.exports= function(req, res, next){
    if(req.user === undefined){
        res.redirect('/')
    }else{
        var clearanceLevel = req.user.clearance;

        switch (req.route.path){
            case '/getAllInvoice':
                var cate = 'ivRead';
                break
            case '/getInvoice':
                var cate = 'ivRead';
                break
            case '/filterInvoice':
                var cate = 'ivRead';
                break
            case '/checkInvoicePerDay':
                var cate = 'ivRead';
                break
            case '/createNewInvoice':
                var cate = 'ivWrite';
                break
            case '/voidInvoice':
                var cate = 'ivEdit';
                break
            case '/printInvoice':
                var cate = 'ivRead';
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
