var del = require('del');

var gulp = require('gulp-help')(require('gulp'));
var connect = require('gulp-connect');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var htmlhint = require('gulp-htmlhint');
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
var less = require('gulp-less');

var config = {
  path: {
    src: 'src',
    htmlall: ['src/*.html', 'src/fragments/*.html'],
    html: 'src/*.html',
    css : 'src/css/**/*.css',
    js  : 'src/js/**/*.js'
  }
};


gulp.task(
  'clean',
  [config.path.css, config.path.lib, config.path.dist].join(', ') + ' を削除する',
  function () {
    del([config.path.css, config.path.lib, config.path.dist]);
  });

gulp.task('watch', function() {
  gulp.watch(config.path.html, ['htmlhint']);
  gulp.watch(config.path.css, ['csslint']);
  gulp.watch(config.path.js, ['jshint']);
  gulp.watch([config.path.html, config.path.css, config.path.js], ['reload']);
});


gulp.task('connect', function() {
  'localhost:8080 でWebサーバ起動',
  connect.server({
    root: config.path.src,
    livereload: true
  });
});

gulp.task('reload', function () {
  return gulp.src([config.path.html, config.path.css, config.path.js])
    .pipe(connect.reload());
});

gulp.task('htmlhint', function() {
  return gulp.src(config.path.html)
    .pipe(htmlhint({htmlhintrc: '.htmlhintrc'}))
    .pipe(htmlhint.reporter());
});

gulp.task('csslint', function() {
  return gulp.src(config.path.css)
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.reporter());
});

gulp.task('jshint', function() {
  return gulp.src(config.path.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', 
  'HTML, CSS, JavaScript のコードチェックとライブリロード実行開始',
  ['watch', 'connect']);
gulp.task(
  'lint', 
  ['htmlhint', 'jshint', 'csslint'].join(', ') + ' をまとめて実行',
  ['htmlhint', 'csslint', 'jshint']);
