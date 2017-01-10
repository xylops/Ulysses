var express = require('express');
var router = express.Router();
//create our App
var app = express();

var routes = require('./route/api');
var productDetail = require('./route/productDetail');
var clientManagement = require('./route/ClientManagement');
var inventoryManagement = require('./route/InventoryManagement');
var invoice = require('./route/Invoice');
var logisticSortInvoice = require('./route/LogisticSortInvoice');
var logisticPickList = require('./route/LogisticPickList')
var logisticDR = require('./route/LogisticDR')
var maintaince = require('./route/maintaince')

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
app.use('/CM', clientManagement);
app.use('/IM', inventoryManagement);
app.use('/IV', invoice);
app.use('/LGSI', logisticSortInvoice);
app.use('/LGPL', logisticPickList);
app.use('/LGDR', logisticDR);
app.use('/maintaince', maintaince);




app.listen(PORT, function(){
    console.log('Express server is up on port ' + PORT)
});
