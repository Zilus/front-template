'use strict';

var gulp = require('gulp'),
    del = require('del'),
    plugins = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /^gulp(-|\.)/,
        lazy: false
    }),
    config = require('./config/config.json');
var browserSync = require('browser-sync').create();

/**
 * Copy images
 */
gulp.task('images', ['clean-images'], function() {
  gulp.start('generate-images');
});

/**
 * Clean images
 */
gulp.task('clean-images', function() {
    del(config.projects[global.project].build + 'img/');
});

/**
 * Generate images
 */
gulp.task('generate-images', function(){
  gulp.src(config.projects[global.project].img)
    .pipe(plugins.plumber())
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(config.projects[global.project].build + 'img/'))
    .pipe(browserSync.stream())
    browserSync.reload
});
