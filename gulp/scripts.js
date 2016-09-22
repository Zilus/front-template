'use strict';

var gulp = require('gulp'),
    del = require('del'),
    gulpif = require('gulp-if'),
    plugins = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /^gulp(-|\.)/,
        lazy: false
    }),
    config = require('./config/config.json'),
    scripts = require('./config/scripts.json'),
    options = {
      "lint": true,
    };

/**
 * Build scripts
 */
gulp.task('scripts', ['clean-scripts'], function() {
  gulp.start('generate-scripts');
});

/**
 * Build scripts without lint
 */
gulp.task('scripts-force', ['clean-scripts'], function() {
  options.lint = false;
  gulp.start('generate-scripts');
});

/**
 * Clean scripts
 */
gulp.task('clean-scripts', function() {
    del(config.projects[global.project].build + 'js');
});

/**
 * Generate scripts
 */
gulp.task('generate-scripts', function() {
  return gulp.src(config.projects[global.project].js)
    .pipe(gulpif(options.lint, plugins.jshint()))
    .pipe(gulpif(options.lint, plugins.jshint.reporter('jshint-stylish')))
    .pipe(plugins.concat('scripts.js'))
    .pipe(gulp.dest(config.projects[global.project].build + 'js'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({ extname: '.min.js' }))
    .pipe(gulp.dest(config.projects[global.project].build + 'js'));
});
