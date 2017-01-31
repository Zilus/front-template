'use strict';

var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    plugins = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /^gulp(-|\.)/,
        lazy: false
    }),
    config = require('./config/config.json');
var browserSync = require('browser-sync').create();

//Default proyect
var countProjects = Object.keys(config.projects).length
var uploadtask = "sftp"
global.project = "test"

 /**
  * Choose project menu
  */
gulp.task('default', function() {
  var task = Array();
  for(var project in config.projects) {
    task.push(project);
  }
  task.push('Exit');

  if(countProjects>1) {
    return gulp.src('*')
    .pipe(plugins.prompt.prompt({
      type: 'list',
      name: 'type',
      message: 'Por favor elige un proyecto',
      choices: task
    }, function(res){
      if(res.type!=="Exit") {
        global.project = res.type;
        gulp.start('menu');
      }
    }));
  } else {
    gulp.start('menu');
  }
});
/**
 * menu
 */
gulp.task('menu', function() {
  var menu =
      'Proyecto '+global.project+'\r\n'
    + '\t1) Develop\r\n'
    + '\t2) Deploy\r\n'
    + '\t3) Distribute\r\n'
    + '\t4) Watch\r\n'
    + '\t5) Serve\r\n'
    + '\t6) Build\r\n'
    + '\t7) Force build\r\n'
    + '\t8) Test\r\n'
    + '\t9) Advanced menu\r\n'
    + '\t0) Exit\r\n '
    + '\tWhat you like to do?';

  return gulp.src('*')
    .pipe(plugins.prompt.prompt({
        type: 'input',
        name: 'type',
        message: menu
    }, function(res){
        switch (res.type) {
          case '1':
            gulp.start('clean-dist');
            gulp.start('build');
            gulp.start('watch');
            break;
          case '2':
            gulp.start('build');
            uploadtask = (config.deploy_method=="ftp") ? 'ftp' : 'sftp' ;
            gulp.start(uploadtask);
            gulp.start('screens');
            break;
          case '3':
            gulp.start('build');
            gulp.start('screens');
            gulp.start('compress');
            break;
          case '4':
            gulp.start('serve');
            break;
          case '5':
            gulp.start('watch');
            break;
          case '6':
            gulp.start('build');
            break;
          case '7':
            gulp.start('force-build');
            break;
          case '8':
            gulp.start('screens');
            break;
          case '9':
            gulp.start('advanced-menu');
            break;

        }
    }));
});

/**
 * Advanced menu
 */
gulp.task('advanced-menu', function() {
  var menu =
      '\t11) Build styles\r\n'
    + '\t12) Build styles force\r\n'
    + '\t21) Build scripts\r\n '
    + '\t22) Build scripts force\r\n '
    + '\t31) Build layout\r\n '
    + '\t32) Build layout force\r\n '
    + '\t41) Generate images\r\n '
    + '\t51) Generate fonts\r\n '
    + '\t61) Deploy FTP\r\n '
    + '\t61) Deploy SFTP\r\n '
    + '\t71) Dependencies\r\n '
    + '\t81) Compress\r\n '
    + '\t91) Test\r\n '
    + '\t0) Return\r\n '
    + '\tWhat you like to do?';

  return gulp.src('*')
    .pipe(plugins.prompt.prompt({
        type: 'input',
        name: 'type',
        message: menu
    }, function(res){
      switch (res.type) {
        case '11':
          gulp.start('styles');
          break;
        case '12':
          gulp.start('styles-force');
          break;
        case '21':
          gulp.start('scripts');
          break;
        case '22':
          gulp.start('scripts-force');
          break;
        case '31':
          gulp.start('layouts');
          break;
        case '32':
          gulp.start('layouts-force');
          break;
        case '41':
          gulp.start('generate-images');
          break;
        case '51':
          gulp.start('fonts');
          break;
        case '61':
          gulp.start('ftp');
          break;
        case '62':
          gulp.start('sftp');
          break;
        case '71':
          gulp.start('dependencies');
          break;
        case '81':
          gulp.start('compress');
          break;
        case '91':
          gulp.start('screens');
          break;
        case '0':
          gulp.start('menu');
          break;
      }
    }));
});

/**
 * Clean dist
 */
gulp.task('clean-dist', function() {
    del(config.projects[global.project].build);
});

/**
 * Build
 */
gulp.task('build', function() {
  gulp.start('generate-layouts');
  gulp.start('generate-styles');
  gulp.start('generate-scripts');
  gulp.start('generate-images');
  gulp.start('generate-fonts');
  gulp.start('generate-iconfonts');
  gulp.start('dependencies');
});

/**
 * Force build
 */
gulp.task('force-build', function() {
  gulp.start('layouts-force');
  gulp.start('styles-force');
  gulp.start('scripts-force');
  gulp.start('generate-images');
  gulp.start('generate-fonts');
  gulp.start('generate-iconfonts');
  gulp.start('dependencies');
});
