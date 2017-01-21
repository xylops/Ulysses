var accessControl = require('../modal/accessControl_model')

module.exports= function(req, res, next){
    // console.log(req.route.path);
    // console.log(req.user.clearance)
    var clearanceLevel = req.user.clearance;

    switch (req.route.path){
        case '/getPickNotComplete':
            var cate = 'lgdrRead';
            break
        case '/reConfirmReturn':
            var cate = 'lgdrEdit';
            break

    }

    accessControl.findOne({role:clearanceLevel}, function(err, data){
        switch(cate){
            case 'lgdrRead':
                if(data.permission.lgdrRead){
                    next();
                }else{
                    res.json({message:'Premission Decline'})
                }
                break;
            case 'lgdrEdit':
                if(data.permission.lgdrEdit){
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
