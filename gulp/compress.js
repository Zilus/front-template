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
 * Zip
 */
 gulp.task('compress', ['delete-zip'], function() {
   gulp.start('generate-zip');
 });

 gulp.task('delete-zip', function() {
     del(config.projects[global.project].zipFilename + '.zip');
     del(config.projects[global.project].zipFilename + '/');
 });

 gulp.task('generate-zip', function() {
   return gulp.src(config.projects[global.project].deploydir)
       .pipe(plugins.zip(config.projects[global.project].zipFilename + '.zip'))
       .pipe(gulp.dest('./'))
 });
