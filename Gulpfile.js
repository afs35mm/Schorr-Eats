var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglifyjs');

gulp.task('server', function() {
	var express  = require('express');
	var app      = express();
	var mongoose = require('mongoose');
	var port  	 = process.env.PORT || 8080;
	var morgan   = require('morgan');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');

	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(morgan('dev')); // log every request to the console
	app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
	app.use(bodyParser.json()); // parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

	app.set('view engine', 'ejs'); // set up ejs for templating

	require('./app/routes.js')(app);
	// listen (start app with node server.js) ======================================
	app.listen(port);
	console.log("App listening on port " + port);

});

gulp.task('sass', function(){
	gulp.src('./assets/scss/*.scss')
	.pipe(sass({errLogToConsole: true}))
	.pipe(gulp.dest('./public/styles'));
});

gulp.task('uglify', function() {
	gulp.src('./assets/js/**/*.js')
	.pipe(uglify('main.js', {
		outSourceMap: true
	}))
	.pipe(gulp.dest('./public/js'))
});

gulp.task('watch', function() {
	gulp.watch('./assets/scss/**/*.scss', ['sass']);
	gulp.watch('./assets/js/**/*.js', ['uglify']);
});

gulp.task('default', ['sass', 'uglify', 'server', 'watch'], function() {});