var Todo = require('./models/restaurant'),
	User = require('./models/user'),
	LocalStrategy = require('passport-local').Strategy;


function getTodos(res){
	Todo.find(function(err, todos) {
			if (err)
				res.send(err)
			res.json(todos); 
	});
};

function ensureAuthenticated (req, res, next) {
	console.log("Cookies: ", req.cookies)
	if(req.isAuthenticated()){
		console.log('is AUTHETNTICED!');
	}else{ 
		console.log('is not :<');
	}

	return next();
}

module.exports = function(app, passport) { 

	app.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup', 
		failureFlash : true  
	}));

	app.get('/signup', function(req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.post('/users/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash : true  
	}));

	
	app.get('/api/todos', function(req, res) {
		getTodos(res);
	});
	
	app.post('/api/todos', function(req, res) {
		Todo.create({
			text : req.body.text,
			done : false,
			location : req.body.location,
		}, function(err, todo) {
			if (err)
				res.send(err);
			getTodos(res);
		});
	});

	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			getTodos(res);
		});
	});
	
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/', ensureAuthenticated, function(req, res) {
		res.render('index.ejs', { 
			user: req.user,
			message: req.flash('loginMessage')
		});
	}); 
};