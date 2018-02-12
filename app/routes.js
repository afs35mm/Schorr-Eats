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
			dateReadable: req.body.date,
			date: new Date(Date.parse(req.body.date)),
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
		// { _id: '588189ac6dae18f06da35e44',
		// __v: 0,
		// ratings:
		// [ { author: 'Andrew',
		// 	notes: 'testabc',
		// 	rating: 4,
		// 	_id: '588189ac6dae18f06da35e45' } ],
		// cuisine: 'BBQ',
		// location: 'dlfjs',
		// name: 'testabc',
		// author: 'A',
		// currentUserRating: { notes: '!!!!!', rating: '4.5' } }
		// console.log(req.params); //{ todo_id: '588189ac6dae18f06da35e44' }
		Todo.findOne({_id: req.body._id}, function(err, data){
		    if (data) {
		    	var isUpdatingExistingReview = false;
		    	for (var i = 0; i < data.ratings.length; i ++) {
		    		if (data.ratings[i].author === req.body.author) {
		    			isUpdatingExistingReview = true;
		    			var reviewIdx = i;
		    			break;
		    		}
		    	}

		    	// new review, push to array
		    	if (!isUpdatingExistingReview) {
		    		data.ratings.push({
		    			author: req.body.author,
		    			rating: req.body.currentUserRating.rating,
		    			notes: req.body.currentUserRating.notes,
		    		});
		    	// updating, update to reviewIdx
		    	} else {
		    		var updatingReview = data.ratings[reviewIdx];
		    		updatingReview.notes = req.body.currentUserRating.notes;
		    		updatingReview.rating = req.body.currentUserRating.rating;
		    	}

		    	data.location = req.body.location;
		    	data.name = req.body.name;
		    	data.cuisine = req.body.cuisine
		    	data.dateReadable = req.body.dateReadable;
		    	data.date = new Date(Date.parse(req.body.dateReadable));

		    	var options = {
					upsert: false,
					// multi: true,
				};
				Todo.update({
					_id : req.params.todo_id,
				},
				{
					$set: data,
				},
				options,
				function(err, todo) {
					if (err){
						res.send(err);
					} else {
						getTodos(res);
					}
				});
		    } else {
		    	res.status(500).send({
		    		error: err,
		    	});
		    }
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
