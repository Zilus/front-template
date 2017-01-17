'use strict';

var gulp = require('gulp'),
    del = require('del'),
    plugins = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /^gulp(-|\.)/,
        lazy: false
    }),
    config = require('./config/config.json');
var runTimestamp = Math.round(Date.now()/1000);

/**
 * Dependencies
 */
 gulp.task('dependencies', function() {
   gulp.start('copy-scripts-dependencies');
   gulp.start('copy-styles-dependencies');
 });

 gulp.task('copy-scripts-dependencies', function () {
   return gulp.src(config.projects[global.project].jsDeps)
     .pipe(gulp.dest(config.projects[global.project].build + 'js'));
 });

 gulp.task('copy-styles-dependencies', function () {
   return gulp.src(config.projects[global.project].jsDeps)
     .pipe(gulp.dest(config.projects[global.project].build + 'css'));
 });
