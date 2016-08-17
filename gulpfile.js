'use strict';

const gulp = require('gulp');
var sass = require('gulp-sass');
var gulpIf = require('gulp-if');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
  return gulp.src('app/scss/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer({
          browsers: ['last 3 versions'],
          cascade: false
      }))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('../css'))
});


gulp.task('watch', ['sass'], function () {
  gulp.watch('app/scss/*.scss', ['sass']);
});

gulp.task('default', function (callback) {
    runSequence(['sass','watch'],
        callback
    )
});
