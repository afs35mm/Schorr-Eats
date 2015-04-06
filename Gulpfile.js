var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglifyjs'),
	nodemon = require('gulp-nodemon'),
	shell = require('gulp-shell');

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
	gulp.watch('./assets/js/**/*.js', ['uglify']);
});

gulp.task('server', shell.task([
	'node app/server.js'
]))

gulp.task('default', ['sass', 'uglify', 'serve' ]);

gulp.task('watch-server', ['sass', 'uglify', 'nodemon', 'assets' ]);

gulp.task('watch', ['sass', 'uglify', 'server', 'assets' ]);


