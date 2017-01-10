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

/**
 * Build styles
 */
gulp.task('styles', ['clean-styles'], function() {
  gulp.start('generate-styles');
});

/**
 * Build styles without lint
 */
gulp.task('styles-force', ['clean-styles'], function() {
  options.lint = false;
  gulp.start('generate-styles');
});

/**
 * Clean styles
 */
gulp.task('clean-styles', function() {
    del(config.projects[global.project].build + 'css');
});

/**
 *  Generate styles
 */
gulp.task('generate-styles', function() {
  return gulp.src(config.projects[global.project].css)
    .pipe(gulpif(options.lint, plugins.sassLint({
      config: '.sass-lint.yml'
    })))
    .pipe(gulpif(options.lint, plugins.sassLint.format()))
    .pipe(gulpif(options.lint, plugins.sassLint.failOnError()))
    .pipe(plugins.addSrc.prepend(config.projects[global.project].cssignore))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({outputStyle: 'expanded'})).on('error', plugins.sass.logError)
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(plugins.concat('style.css'))
    .pipe(gulp.dest(config.projects[global.project].build + 'css'))
    .pipe(plugins.cssnano({zindex: false}))
    .pipe(plugins.rename({ extname: '.min.css' }))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(config.projects[global.project].build + 'css'))
    .pipe(browserSync.stream());
});
