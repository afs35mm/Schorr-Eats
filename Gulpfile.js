var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglifyjs'),
	nodemon = require('gulp-nodemon'),
	shell = require('gulp-shell'),
	watchify = require('watchify'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	gutil = require('gulp-util'),
	sourcemaps = require('gulp-sourcemaps');

gulp.task('nodemon', function() {
		nodemon({ script: './app/server.js',
		env: { 'NODE_ENV': 'development' },
    	//ignore: ['/assets/js/main', '/assets/js/main.js']
	})
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

gulp.task('assets', function() {
	gulp.watch('./assets/scss/**/*.scss', ['sass']);
	//gulp.watch('./assets/js/**/*.js', ['uglify']);
});

gulp.task('server', shell.task([
	'node app/server.js'
]))

var b = watchify(browserify({
	entries: ['./assets/js/main.js'],
	debug: true
}));

b.on('update', function(){ 
	gulp.start('bundle');
}); 
 
gulp.task('bundle', function(){
	console.log('bundlin!');
	return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) 
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['sass', 'uglify', 'serve', 'bundle' ]);

gulp.task('watch-server', ['sass', 'uglify', 'nodemon', 'assets', 'bundle' ]);

gulp.task('watch', ['sass', 'uglify', 'server', 'assets', 'bundle' ]);

gulp.task('js', ['bundle'])

