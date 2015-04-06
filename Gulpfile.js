var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglifyjs'),
	nodemon = require('gulp-nodemon');

gulp.task('server', function() {
	nodemon({ script: './app/server.js'
	})
    .on('restart', function () {
    	console.log('restarted!')
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

gulp.task('watch', function() {
	gulp.watch('./assets/scss/**/*.scss', ['sass']);
	gulp.watch('./assets/js/**/*.js', ['uglify']);
});


gulp.task('default', ['sass', 'uglify', 'server', 'watch' ]);


