'use strict';
var gulp = require('gulp'),
    del = require('del'),
    gulpif = require('gulp-if'),
    fs = require('fs'),
    path = require('path'),
    plugins = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /^gulp(-|\.)/,
        lazy: false
    }),
    config = require('./config/config.json'),
    options = {
      "lint": true,
    };
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

/**
 * Watch
 */
gulp.task('watch', function() {
    browserSync.init({
        injectChanges: true,
        notify: false,
        server: "./dist"
    });
    gulp.watch(config.projects[global.project].css, ['generate-styles']);
    gulp.watch(config.projects[global.project].html, ['generate-layouts']);
    gulp.watch(config.projects[global.project].js, ['generate-scripts']);

    plugins.watch(config.projects[global.project].img)
      .pipe(plugins.plumber())
      .pipe(plugins.imagemin())
      .pipe(gulp.dest(config.projects[global.project].build + 'img/'))
      .pipe(browserSync.stream());

    browserSync.watch( "dist/**/*" ).on('change', reload);
});

/**
 * Serve
 */
gulp.task('serve', function() {
    browserSync.init({
        injectChanges: true,
        notify: false,
        server: "./dist"
    });
});
