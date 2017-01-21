var accessControl = require('../modal/accessControl_model')

module.exports= function(req, res, next){
    // console.log(req.route.path);
    // console.log(req.user.clearance)
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
        switch(cate){
            case 'lgsiRead':
                if(data.permission.lgsiRead){
                    next();
                }else{
                    res.json({message:'Premission Decline'})
                }
                break;
            case 'lgsiEdit':
                if(data.permission.lgsiEdit){
                    next();
                }else{
                    res.json({message:'Premission Decline'})
                }
                break;
            default:
                res.json({message:'Premission Decline'})
        }
    })
}
