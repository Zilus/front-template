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

var gulpSSH = new plugins.ssh({
  ignoreErrors: false,
  sshConfig: {
    host: config.sshConfig.host,
    port: config.sshConfig.port,
    username: config.sshConfig.username,
    passphrase: config.sshConfig.passphrase,
    privateKey: fs.readFileSync(config.sshConfig.privateKey)
  }
})

var gulpFTP = ftp.create({
    host: config.ftpConfig.host,
    user: config.ftpConfig.username,
    password: config.ftpConfig.password,
    parallel: 10
})

var countProjects = Object.keys(config.projects).length
if(countProjects>1) {
  var sshdest = config.deploy.remoteTmp + '/' + global.project
  var ftpbase = 'dist/'
} else {
  var sshdest = config.deploy.remoteTmp
  var ftpbase = 'dist/'+global.project
}

/**
 *  Deply via SSH
 */
gulp.task('sftp', function(cb) {
  console.log(countProjects);
     runSequence('sftp-upload',
                 'shell',
                 cb);
});
gulp.task('sftp-upload', ['sftp-clean'], function() {
  return gulp.src(config.projects[global.project].deploydir)
    .pipe(gulpSSH.dest(sshdest))
});

gulp.task('sftp-clean', function() {
  return gulpSSH
    .shell(['rm -Rfv ' + config.deploy.remoteTmp], {filePath: 'shell.log'})
});

gulp.task('shell', function() {
  return gulpSSH
    .shell(['cd ' + config.deploy.remoteScript, './update.sh'], {filePath: 'shell.log'})
});

/**
 *  Deploy via FTP
 */
gulp.task('ftp', function() {
  return gulp.src(config.projects[global.project].deploydir, { base: ftpbase, buffer: false })
    .pipe(gulpFTP.dest(config.deploy.remoteFTP));
});
