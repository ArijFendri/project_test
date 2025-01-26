const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();


gulp.task('scss', function () {
  return gulp.src('scss/styles.scss') 
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css')) 
    .pipe(browserSync.stream());
});


gulp.task('serve', function () {
  browserSync.init({
    server: './' 
  });

  gulp.watch('scss/**/*.scss', gulp.series('scss')); 
  gulp.watch('./*.html').on('change', browserSync.reload); 
});


gulp.task('default', gulp.series('scss', 'serve'));
