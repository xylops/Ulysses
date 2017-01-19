var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');

//own route
var index = require('./route/index');
var users = require('./route/users')
//api
var productDetail = require('./route/apiProductDetail');
var clientManagement = require('./route/apiClientManagement');
var inventoryManagement = require('./route/apiInventoryManagement');
var invoice = require('./route/apiInvoice');
var logisticSortInvoice = require('./route/apiLogisticSortInvoice');
var logisticPickList = require('./route/apiLogisticPickList')
var logisticDR = require('./route/apiLogisticDR')
var maintaince = require('./route/maintaince')

//create our App
var app = express();
//view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
// Set Staic Folder
app.use(express.static('public'));
//Express session
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}))
//passport init
app.use(passport.initialize());
app.use(passport.session());
//express validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));
//Connect flash
app.use(flash());
//Globar Vars
app.use(function(req,res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', index);
app.use('/users', users)
//app
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
