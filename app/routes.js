const Restaurant = require('./models/restaurant');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;

function getRestaurants(res){
	Restaurant.find(function(err, restaurants) {
		if (err)
			res.send(err)
		res.json(restaurants);
	});
};

function ensureAuthenticated (req, res, next) {
	req.isAuthenticated();
	console.log(req.isAuthenticated());
	return next();
};

module.exports = function(app, passport) {
	app.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	app.get('/signup', function(req, res) {
		const messageBody = req.user ? 'You\'re signed in already!' : req.flash('signupMessage');
		res.render('signup.ejs', {
			message: messageBody
		});
	});

	app.post('/users/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash : true
	}));

	app.get('/api/todos', function(req, res) {
		getRestaurants(res);
	});

	app.post('/api/todos', function(req, res) {
		Restaurant.create({
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
			getRestaurants(res);
		});
	});

	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			getRestaurants(res);
		});
	});

	app.put('/api/todos/:todo_id', function(req, res) {
		Restaurant.findOne({_id: req.body._id}, function(err, data){
		    if (data) {
		    	const isUpdatingExistingReview = false;
		    	for (const i = 0; i < data.ratings.length; i ++) {
		    		if (data.ratings[i].author === req.body.author) {
		    			isUpdatingExistingReview = true;
		    			const reviewIdx = i;
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
		    		const updatingReview = data.ratings[reviewIdx];
		    		updatingReview.notes = req.body.currentUserRating.notes;
		    		updatingReview.rating = req.body.currentUserRating.rating;
		    	}

		    	data.location = req.body.location;
		    	data.name = req.body.name;
		    	data.cuisine = req.body.cuisine
		    	data.dateReadable = req.body.dateReadable;
		    	data.date = new Date(Date.parse(req.body.dateReadable));

		    	const options = {
					upsert: false,
					// multi: true,
				};
				Restaurant.update({
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
						getRestaurants(res);
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
		Restaurant.findOne({ _id: req.params.todo_id}, function(err, todo){
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
		console.log(req.user);
		res.render('index.ejs', {
			user: req.user,
			message: req.flash('loginMessage')
		});
	});
};
