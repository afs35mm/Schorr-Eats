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
	//console.log("Cookies: ", req.cookies)
	if(req.isAuthenticated()){
		console.log('is AUTHETNTICED!');
	}else{
		console.log('is not :<');
	}

	return next();
	// if the user is not authenticated then redirect him to the login page
	//res.redirect('/');
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

	// // process the signup form
	// app.post('/signup', passport.authenticate('local-signup', {
	// 	successRedirect : '/profile', // redirect to the secure profile section
	// 	failureRedirect : '/signup', // redirect back to the signup page if there is an error
	// 	failureFlash : true // allow flash messages
	// }));

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

	// app.get('/signup', function(req, res) {
	// 	res.render('signup.ejs', { message: req.flash('signupMessage') });
	// });
	
	app.get('/', function(req, res) {
		console.log(req.isAuthenticated());
		res.render('index.ejs', { 
			user: req.user,
			message: req.flash('loginMessage')
		});
	}); 
};