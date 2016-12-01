var express = require('express');
// var router = express.Router();
//create our App
var app = express();

var routes = require('./route/api');
var productDetail = require('./route/productDetail');


const PORT = process.env.PORT || 3000;

app.use(function(req, res, next){
    if(req.headers['x-forwarded-proto'] === 'https'){
        res.redirect('http://' + req.hostname + req.url);
    }else{
        next();
    }
})

app.use(express.static('public'));
app.use('/', routes);
app.use('/PD', productDetail);



app.listen(PORT, function(){
    console.log('Express server is up on port ' + PORT)
});
