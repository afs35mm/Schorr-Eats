var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var port  	 = process.env.PORT || 8080;
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser'); 

app.use(express.static( __dirname + '/../public'));
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(flash());
app.use(cookieParser());
app.use(expressSession({
	secret: 'iloverootbeer',
	// resave: false,
	// saveUninitialized: true,
	// cookie: { secure: true }
})); 
app.use(passport.initialize());
app.use(passport.session());

var initPassport = require('./passport/init');
initPassport(passport);

app.set('view engine', 'ejs'); 
require('./routes.js')(app, passport);
app.listen(port);
console.log("App listening on port " + port);