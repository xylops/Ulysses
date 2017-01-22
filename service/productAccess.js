var accessControl = require('../modal/accessControl_model')

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
            switch(cate){
                case 'pdRead':
                    if(data.permission.pdRead){
                        next();
                    }else{
                        res.json({message:'Premission Decline'})
                    }
                    break;
                case 'pdWrite':
                    if(data.permission.pdWrite){
                        next();
                    }else{
                        res.json({message:'Premission Decline'})
                    }
                    break;
                case 'pdEdit':
                    if(data.permission.pdEdit){
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
