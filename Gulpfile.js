var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglifyjs'),
	nodemon = require('gulp-nodemon'),
	watchify = require('watchify'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	gutil = require('gulp-util'),
	sourcemaps = require('gulp-sourcemaps'),
	argv = require('yargs').argv;

gulp.task('nodemon', function() {
		nodemon({ script: './app/server.js',
		env: { 'NODE_ENV': 'development' },
		ext: 'json js',
    	//ignore: ['/client/js/main', '/client/js/main.js']
    	ignore: ['client/*']
	})
	.on('restart', function () {
		console.log('Restarted webserver')
	});
});

gulp.task('sass', function(){
	gulp.src('./client/scss/*.scss')
	.pipe(sass({errLogToConsole: true}))
	.pipe(gulp.dest('./public/styles'));
});

gulp.task('uglify', function() {
	gulp.src('./client/js/**/*.js')
	.pipe(uglify('main.js', {
		outSourceMap: true
	}))
	.pipe(gulp.dest('./public/js'))
});

gulp.task('client', function() {
	gulp.watch('./client/scss/**/*.scss', ['sass']);
	//gulp.watch('./client/js/**/*.js', ['uglify']);
});

gulp.task('serve', function () {
	console.log('+++');
	var db = (argv.db === 'do' || argv.db === 'mod') ? argv.db : '';
	nodemon({
		script: 'app/server.js',
		env: {
			'USER_DB': db,
			'NODE_ENV': 'development'
		}
	});
	console.log(db);
})

var b = watchify(browserify({
	entries: ['./client/js/main.js'],
	debug: true
}));

b.on('update', function(){
	gulp.start('bundle');
});

gulp.task('bundle', function(){
	return b.bundle()
    //.on('error', gutil.log.bind(gutil, 'Browserify Error'))
	.on('error', function(err){
		// print the error (can replace with gulp-util)
		console.log(err.message);
		this.emit('end');
	})

    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['sass', 'uglify', 'serve', 'bundle' ]);

gulp.task('watch-server', ['sass', 'uglify', 'nodemon', 'client', 'bundle' ]);

gulp.task('watch', ['sass', 'uglify', 'serve', 'client', 'bundle' ]);

gulp.task('js', ['bundle'])

