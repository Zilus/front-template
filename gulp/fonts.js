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
 * Copy fonts
 */
gulp.task('fonts', ['clean-fonts'], function() {
  gulp.start('generate-fonts');
});

/**
 * Clean fonts
 */
gulp.task('clean-fonts', function() {
    del(config.projects[global.project].build + 'fonts/');
});

/**
 * Generate fonts
 */
gulp.task('generate-fonts', function(){
  gulp.src(config.projects[global.project].fonts)
    .pipe(plugins.plumber())
    .pipe(gulp.dest(config.projects[global.project].build + 'fonts/'));
});

/**
 * Generate ICOMoon Fonts
 */
gulp.task('generate-iconfonts', function() {
  console.log(config.projects[global.project].icons);
  return gulp.src([config.projects[global.project].icons])
    .pipe(plugins.debug())
    .pipe(plugins.iconfont({
      fontName: 'iconfont', // required
      prependUnicode: false, // recommended option
      formats: ['ttf', 'eot', 'woff', 'woff2'], // default, 'woff2' and 'svg' are available
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
    }))
      .on('glyphs', function(glyphs, options) {
        console.log(glyphs, options);
      })
    .pipe(gulp.dest(config.projects[global.project].build + 'fonts/'));
});
