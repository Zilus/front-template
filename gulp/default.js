'use strict';

var gulp = require('gulp'),
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
global.project = "cotizador"

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
    + '\t1) Build All\r\n'
    + '\t2) Force build all\r\n'
    + '\t3) Deploy\r\n'
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
            gulp.start('layouts');
            gulp.start('styles');
            gulp.start('scripts');
            gulp.start('generate-images');
            gulp.start('fonts');
            break;
          case '2':
            gulp.start('layouts-force');
            gulp.start('styles-force');
            gulp.start('scripts-force');
            gulp.start('generate-images');
            gulp.start('fonts');
            break;
            case '3':
              if(config.deploy_method=="ftp") {
                uploadtask="ftp"
              } else {
                uploadtask="sftp"
              }
              gulp.start(uploadtask);
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
    //+ '\t61) Generate docs \r\n '
    //+ '\t71) Generate screenshots \r\n '
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
        case '0':
          gulp.start('menu');
          break;
      }
    }));
});
