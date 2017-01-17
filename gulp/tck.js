'use strict';

var gulp = require('gulp'),
    del = require('del'),
    gulpif = require('gulp-if'),
    fs = require('fs'),
    ftp = require( 'vinyl-ftp' ),
    runSequence = require('run-sequence'),
    onError = function (err) {
      console.log(err.toString());
      this.emit('end');
    },
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

/**
 *  TCK Playground
 */
gulp.task('tck', function() {
  //.pipe(plugins.debug())
  console.log("TCK Test task");
  console.log(config.projects[global.project].build + '**/*.html');
});
