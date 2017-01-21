var accessControl = require('../modal/accessControl_model')

module.exports= function(req, res, next){
    // console.log(req.route.path);
    // console.log(req.user.clearance)
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
        switch(cate){
            case 'imRead':
                if(data.permission.imRead){
                    next();
                }else{
                    res.json({message:'Premission Decline'})
                }
                break;
            case 'imWrite':
                if(data.permission.imWrite){
                    next();
                }else{
                    res.json({message:'Premission Decline'})
                }
                break;
            case 'imEdit':
                if(data.permission.imEdit){
                    next();
                }else{
                    res.json({message:'Premission Decline'})
                }
                break;
            default:
                res.json({message:'Premission Decline'})
        }
        // next();

    })
}
