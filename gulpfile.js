var  gulp = require('gulp'),
     browserSync = require('browser-sync'),
     rename = require('gulp-rename'),
     sass = require('gulp-sass');

var server = browserSync.create();

var paths = {
     styles: {
       src: 'src/scss/**/*.scss',
       dest: 'dist/css/'
     },
     scripts: {
       src: 'src/js/**/*.js',
       dest: 'dist/js/'
     }
   };

function reload() {
     browserSync.reload();
}

function serve(done) {
     server.init({
          server: {
               baseDir: './src'
          }
     });
     done();
}

function styles() {
     return gulp
          .src(paths.styles.src)
          .pipe(sass(
               { outputStyle: 'compressed' }
          ))
          .on('error', sass.logError)
          .pipe(rename({
               suffix: '.min'
          }))
          .pipe(gulp.dest(paths.styles.dest))
          .pipe(browserSync.stream());
}

function watch() {
     browserSync.init({
          server: {
               baseDir: './src'
          }
     });

     gulp.watch(paths.styles.src, styles);
}

exports.styles = styles;
exports.watch = watch;

var build = gulp.parallel(styles, watch)

exports.default = build;