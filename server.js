var express = require('express');
var router = express.Router();
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan')
var passportService = require('./service/passport')
var passport = require('passport');
var cookieParser = require('cookie-parser');

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

var user = require('./route/user')

var requireAuth = passport.authenticate('jwt', {session:false});

app.use(cookieParser());


app.get('/system.html', requireAuth, function(req, res){
    console.log('working')
    res.send('working')
})


app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type: 'application/*+json'}));
app.use('/user', user)

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

const PORT = process.env.PORT || 3000;

app.use(function(req, res, next){
    if(req.headers['x-forwarded-proto'] === 'https'){
        res.redirect('http://' + req.hostname + req.url);
    }else{
        next();
    }
})

app.listen(PORT, function(){
    console.log('Express server is up on port ' + PORT)
});
