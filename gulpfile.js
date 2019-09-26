const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      concat = require('gulp-concat'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass');

const server = browserSync.create();

const paths = {
     styles: {
          src: 'src/scss/**/*.scss',
          dest: 'dist/css/'
     },
     scripts: {
          src: 'src/js/**/*.js',
          dest: 'dist/js/'
     },
     html: {
          src: 'src/**/*.html',
          dest: 'dist/'
     }
};

function scripts() {
     return gulp
          .src(paths.scripts.src)
          .pipe(concat('build.min.js'))
          .pipe(gulp.dest(paths.scripts.dest));
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
               baseDir: './dist'
          }
     });

     gulp.watch(paths.styles.src, styles);
     gulp.watch(paths.html.src);
}

exports.scripts = scripts;
exports.styles = styles;
exports.watch = watch;

const build = gulp.parallel(scripts, styles, watch);
exports.default = build;