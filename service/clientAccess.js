var accessControl = require('../modal/accessControl_model')

module.exports= function(req, res, next){
    // console.log(req.route.path);
    // console.log(req.user.clearance)
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
            switch(cate){
                case 'cmRead':
                    if(data.permission.cmRead){
                        next();
                    }else{
                        res.json({message:'Premission Decline'})
                    }
                    break;
                case 'cmWrite':
                    if(data.permission.cmWrite){
                        next();
                    }else{
                        res.json({message:'Premission Decline'})
                    }
                    break;
                case 'cmEdit':
                    if(data.permission.cmEdit){
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


}
