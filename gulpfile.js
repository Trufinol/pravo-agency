var gulp = require('gulp');
//var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: './' 
        },
        notify: false 
    });
});

gulp.task('css', function () {

	return gulp.src('./assets/scss/*.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))	
	.pipe(concatCss("./bundle.css"))
	.pipe(gulp.dest('./assets/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', function () {
	gulp.watch('./assets/scss/*.scss', ['css'])

});

gulp.task('default', ['browser-sync','watch']);