'use strict';
var fs              = require('fs'),
    path            = require('path'),
    chalk           = require('chalk'),
    mkdirp          = require('mkdirp'),
    jsonfile        = require('jsonfile'),
    createJson      = require('../helpers/createJson'),
    fileExists      = require('../helpers/fileExists');

var writePackage = function (packageFile, self){

  var packageJson;

  if(fileExists(packageFile, function(result){
    if(result){
      packageJson = jsonfile.readFileSync(packageFile);
      packageDependencies(self, packageJson, function(packageJson){
        createJson(packageFile, packageJson);
      })
    } else {
      packageDefaults(self, packageJson, function(packageJson){
        packageDependencies(self, packageJson, function(packageJson){
          createJson(packageFile, packageJson);
        })
      });
    }
  }));


  function packageDefaults(self, packageJson, cb){
    packageJson = {};
    packageJson['name'] = 'name';
    packageJson['version'] = '0.0.0';
    packageJson['description'] = 'this is an email';
    packageJson['license'] = '';
    packageJson['authors'] = '';
    packageJson['homepage'] = '';
    packageJson['repository'] = '';
    packageJson['main'] = 'gulpfile.js';
    packageJson['devDependencies'] = {};
    packageJson['dependencies'] = {};

    cb(packageJson);
  }


  function packageDependencies(self, packageJson, cb){
    packageJson['devDependencies']['browser-sync'] = '^2.11.1';
    if(self.gulpTypeOption === 'coffee') packageJson['devDependencies']['coffee-script'] = '^1.10.0';
    packageJson['devDependencies']['gulp'] = '^3.9.1';
    packageJson['devDependencies']['gulp-plumber'] = '^1.1.0';
    packageJson['devDependencies']['gulp-changed'] = '^1.3.0';
    packageJson['devDependencies']['gulp-watch'] = '^4.3.5';
    packageJson['devDependencies']['gulp-concat'] = '^2.6.0';
    packageJson['devDependencies']['gulp-util'] = '^3.0.7';
    packageJson['devDependencies']['gulp-notify'] = '^2.0.0';
    packageJson['devDependencies']['require-dir'] = '^0.3.0';

    packageJson['dependencies']['gulp-imagemin'] = '^2.4.0';
    packageJson['dependencies']['gulp-unused-images'] = '^1.1.1';

    packageJson['dependencies']['gulp-cssbeautify'] = '^0.1.3';
    packageJson['dependencies']['gulp-inline-css'] = '^2.0.0';
    packageJson['dependencies']['gulp-inline-source'] = '^2.1.0';
    packageJson['dependencies']['gulp-prettify'] = '^0.4.0';
    packageJson['dependencies']['gulp-special-html'] = '^0.0.4';
    // packageJson['dependencies']['gulp-html-replace'] = '^1.5.5';
    // packageJson['dependencies']['gulp-inject'] = '^4.0.0';

    switch(self.preproOption){
      case 'scss':
        packageJson['dependencies']['gulp-sass'] = '^2.0.1';
        packageJson['dependencies']['gulp-sass-glob'] = '^1.0.6';
      break;

      case 'stylys':
        packageJson['dependencies']['gulp-stylus'] = '^2.3.1';
      break;

      case 'less':
        packageJson['dependencies']['gulp-stylus'] = '^2.3.1';
      break;
    }

    switch(self.templateOption){
      case 'jade':
        packageJson['dependencies']['gulp-jade'] = '^1.1.0';
      break;

      case 'pug':
        packageJson['dependencies']['gulp-pug'] = '^2.0.0';
      break;

      case 'nunjucks':
        packageJson['dependencies']['gulp-nunjucks-render'] = '^2.0.0';
      break;
    }

    cb(packageJson);
  }
}

module.exports = writePackage;
