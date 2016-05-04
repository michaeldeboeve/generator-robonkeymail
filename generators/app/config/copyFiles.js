'use strict';
var fs          = require('fs'),
    path        = require('path'),
    jsonfile    = require('jsonfile'),
    mkdirp      = require('mkdirp'),
    printTitle  = require('../helpers/printTitle');






function copyFiles(self, destRoot, gulpRoot, sourceRoot, cb){

  var ext = '.js';

  self.fs.copy(
    path.join(sourceRoot, '_editorconfig'),
    path.join(destRoot, '.editorconfig')
  );
  self.fs.copy(
    path.join(sourceRoot, '_gitignore'),
    path.join(destRoot, '.gitignore')
  );
  self.fs.copy(
    path.join(sourceRoot, '_gitattributes'),
    path.join(destRoot, '.gitattributes')
  );
  // self.fs.copyTpl(
  //   path.join(sourceRoot, 'README.md'),
  //   path.join(destRoot, 'README.md'),
  //   templateContext
  // );


  // Gulp
  if(self.gulpTypeOption === 'coffee'){
    ext = '.coffee';
    self.fs.copy(
      path.join(sourceRoot, 'gulp/coffee_gulpfile.js'),
      path.join(gulpRoot, 'gulpfile.js')
    );
  }

  self.fs.copy(
    path.join(sourceRoot, 'gulp/gulpfile' + ext),
    path.join(gulpRoot, 'gulpfile' + ext)
  );

  self.fs.copy(
    path.join(sourceRoot, 'gulp/gulp-tasks/browsersync' + ext),
    path.join(gulpRoot, 'gulp-tasks/browsersync' + ext)
  );

  self.fs.copy(
    path.join(sourceRoot, 'gulp/gulp-tasks/images' + ext),
    path.join(gulpRoot, 'gulp-tasks/images' + ext)
  );

  self.fs.copyTpl(
    path.join(sourceRoot, 'gulp/gulp-tasks/html' + ext),
    path.join(gulpRoot, 'gulp-tasks/html' + ext),
    { templateOption: self.templateOption }
  );

  self.fs.copyTpl(
    path.join(sourceRoot, 'gulp/gulp-tasks/styles' + ext),
    path.join(gulpRoot, 'gulp-tasks/styles' + ext),
    { preproOption: self.preproOption }
  );



  // Templates
  switch (self.templateOption){
    case 'jade':
      self.fs.copy(
        path.join(sourceRoot, 'src/views-jade'),
        path.join(destRoot, 'src/html/views')
      );
      self.fs.copy(
        path.join(sourceRoot, 'src/versions-jade'),
        path.join(destRoot, 'src/html/versions')
      );
    break;

    case 'pug':
      self.fs.copy(
        path.join(sourceRoot, 'src/views-pug'),
        path.join(destRoot, 'src/html/views')
      );
      self.fs.copy(
        path.join(sourceRoot, 'src/versions-pug'),
        path.join(destRoot, 'src/html/versions')
      );
    break;

    case 'nunjucks':
      self.fs.copy(
        path.join(sourceRoot, 'src/views-nunjucks'),
        path.join(destRoot, 'src/html/views')
      );
      self.fs.copy(
        path.join(sourceRoot, 'src/versions-nunjucks'),
        path.join(destRoot, 'src/html/versions')
      );
    break;
  }


  // Styles
  switch (self.preproOption){
    case 'scss':
      self.fs.copy(
        path.join(sourceRoot, 'src/styles-scss'),
        path.join(destRoot, 'src/styles')
      );
    break;

    case 'stylus':
      self.fs.copy(
        path.join(sourceRoot, 'src/styles-stylus'),
        path.join(destRoot, 'src/styles')
      );
    break;

    case 'less':
      self.fs.copy(
        path.join(sourceRoot, 'src/styles-less'),
        path.join(destRoot, 'src/styles')
      );
    break;
  }

  cb();
}

module.exports = copyFiles;
