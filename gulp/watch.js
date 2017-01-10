'use strict';

var gulp = require('gulp'),
    config = require('./config/config.json');
var browserSync = require('browser-sync').create();

/**
 * BrowserSync
 */
gulp.task('serve', function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch(config.projects[global.project].css, ['generate-styles']);
    gulp.watch(config.projects[global.project].html, ['generate-layouts']);
    gulp.watch(config.projects[global.project].js, ['generate-scripts']);
    
    gulp.watch("./dist/**/*").on('change', browserSync.reload);
});
