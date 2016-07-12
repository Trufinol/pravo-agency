var gulp = require('gulp');
//var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({
      server: {
          baseDir: "./",
          index: "main.html"
      },
      port:3000,
      open: true,
      notify: false
    });
  });

  gulp.task('html', function(){
  gulp.src('/main.html')
  .pipe(reload({stream:true}));
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
  gulp.watch('/main.html', ['html']);
});

gulp.task('default', ['browser-sync','watch']);
