const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      concat = require('gulp-concat'),
      imagemin = require('gulp-imagemin'),
      imageminMozjpeg = require('imagemin-mozjpeg'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify');

const server = browserSync.create();

const paths = {
     imgs: {
          src: 'src/img/*.{gif,png,jpg}',
          dest: 'dist/assets/img'
     },
     html: {
          src: 'src/**/*.html',
          dest: 'dist/'
     },
     styles: {
          src: 'src/scss/**/*.scss',
          dest: 'dist/assets/css/'
     },
     scripts: {
          src: 'src/js/**/*.js',
          dest: 'dist/assets/js/'
     }
};

function html() {
     return gulp 
          .src(paths.html.src)
          .pipe(gulp.dest(paths.html.dest))
          .pipe(browserSync.stream());
}

function images() {
     return gulp
          .src(paths.imgs.src)
          .pipe(imagemin([
               imageminMozjpeg({
                    quality: 75
               })
          ]))
          .pipe(gulp.dest(paths.imgs.dest));
}

function scripts() {
     return gulp
          .src(paths.scripts.src, { sourcemaps: true })
          .pipe(uglify())
          .pipe(concat('build.min.js'))
          .pipe(gulp.dest(paths.scripts.dest))
          .pipe(browserSync.stream());
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

     gulp.watch(paths.html.src, html);
     gulp.watch(paths.scripts.src, scripts);
     gulp.watch(paths.styles.src, styles);
}

exports.images = images;
exports.html = html;
exports.scripts = scripts;
exports.styles = styles;
exports.watch = watch;

const build = gulp.parallel(images, html, scripts, styles, watch);
exports.default = build;