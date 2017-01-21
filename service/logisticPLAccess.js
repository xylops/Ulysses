var accessControl = require('../modal/accessControl_model')

module.exports= function(req, res, next){
    // console.log(req.route.path);
    // console.log(req.user.clearance)
    var clearanceLevel = req.user.clearance;

    switch (req.route.path){
        case '/getPickList':
            var cate = 'lgplRead';
            break
        case '/completePickList':
            var cate = 'lgplEdit';
            break

    }

    accessControl.findOne({role:clearanceLevel}, function(err, data){
        switch(cate){
            case 'lgplRead':
                if(data.permission.lgplRead){
                    next();
                }else{
                    res.json({message:'Premission Decline'})
                }
                break;
            case 'lgplEdit':
                if(data.permission.lgplEdit){
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
