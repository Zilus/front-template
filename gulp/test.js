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
 * Crossbrowser and Device size tests
 */
 gulp.task('screens', ['clean-screens'], function() {
  gulp.start('generate-screens');
});

gulp.task('clean-screens', function() {
    del('screens/');
});

gulp.task('generate-screens', function() {
  gulp.src(config.projects[global.project].build + '**/*.html')
    .pipe(plugins.localScreenshots({
      width: config.projects[global.project].screenSizes,
      path: config.projects[global.project].build
    }));
});
