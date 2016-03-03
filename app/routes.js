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
	req.isAuthenticated()
	return next();
};

module.exports = function(app, passport) {

	app.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	app.get('/signup', function(req, res) {
		var messageBody = req.user ? 'You\'re signed in already!' : req.flash('signupMessage');
		res.render('signup.ejs', { message: messageBody });
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
			name : req.body.name,
			location : req.body.location,
			cuisine : req.body.cuisine,
			ratings : [{
				author: req.body.user,
				notes: req.body.comments,
				rating: req.body.rating,
			}]
		},
		function(err, todo) {
			if (err) {
				res.send(err);
			}
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

	app.put('/api/todos/:todo_id', function(req, res) {
		var update = {
			$set: {
				name : req.body.name,
				location : req.body.location,
				cuisine : req.body.cuisine || '',
				addedBy : req.body.addedBy || '',
			},
		};

		var authorFound = false,
			idToUpdate = null,
			ratingArrayPosition = null;

		for( var i = 0; i <  req.body.ratings.length; i++){
			console.log(req.body.ratings[i].author);
			if (req.body.ratings[i].author === req.body.author && !authorFound) {
				authorFound = !authorFound;
				idToUpdate = req.body.ratings[i]._id;
				ratingArrayPosition = i;
			}
		}

		if(!authorFound){
			update.$push = {
				'ratings' : {
					author : req.body.author,
					notes : req.body.currentUserRating.notes,
					rating : req.body.currentUserRating.rating,
				}
			}
		} else {
			//no idea why I have to do it like this it doesn't work when I try string concatenation in the update.$set object :(
			//http://stackoverflow.com/questions/18156336/setting-value-of-an-array-element-in-mongoose-using-index
			update.$set['ratings.' + ratingArrayPosition + '.notes'] = req.body.currentUserRating.notes || '';
			update.$set['ratings.' + ratingArrayPosition + '.rating'] = req.body.currentUserRating.rating || '';
		}

		console.log(update);

		var options = {
			upsert: true
		};
		Todo.update({
			_id : req.params.todo_id,
		},
		update,
		options,
		function(err, todo) {
			if (err)
				res.send(err);
			getTodos(res);
		});
	});

	app.get('/api/todos/:todo_id', function(req, res) {
		Todo.findOne({ _id: req.params.todo_id}, function(err, todo){
			if (err){
	            console.log('error occured in the database');
	        }
	        res.json(todo);
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
