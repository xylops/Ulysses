var accessControl = require('../modal/accessControl_model')

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
            switch(cate){
                case 'ivRead':
                    if(data.permission.ivRead){
                        next();
                    }else{
                        res.json({message:'Premission Decline'})
                    }
                    break;
                case 'ivWrite':
                    if(data.permission.ivWrite){
                        next();
                    }else{
                        res.json({message:'Premission Decline'})
                    }
                    break;
                case 'ivEdit':
                    if(data.permission.ivEdit){
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
