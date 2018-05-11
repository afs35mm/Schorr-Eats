const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const expressSession = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

require('dotenv').config();

app.use(express.static( __dirname + '/../dist'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(flash());
app.use(cookieParser());
app.use(expressSession({
	secret: 'iloverootbeer',
	resave: false,
	saveUninitialized: true,
	// only working with HTTP for now :(
	// cookie: {secure: true}
}));
app.use(passport.initialize());
app.use(passport.session());

const initPassport = require('./passport/init');
initPassport(passport);
app.set('views', `${__dirname}/../views`);
app.set('view engine', 'ejs');
require('./routes.js')(app, passport);
app.listen(port);
console.log(`App listening on port ${port}`);