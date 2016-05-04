'use strict';
var fs              = require('fs'),
    path            = require('path'),
    jsonfile        = require('jsonfile'),
    createJson      = require('../helpers/createJson'),
    fileExists      = require('../helpers/fileExists');

var writeConfig = function (configFile, self){
  var configJson;

  if(fileExists(configFile, function(result){
    if ( result ){
      configJson = jsonfile.readFileSync(configFile);
      createConfig(self, configJson, function(configJson){
        createJson(configFile, configJson);
      });
    } else {
      configJson = {};
      createConfig(self, configJson, function(configJson){
        createJson(configFile, configJson);
      });
    }
  }));


  function createConfig(self, configJson, cb){

    configJson['browsersync'] = {};
    configJson['browsersync']['server'] = self.rootFolder + 'dest/version-1/';



    configJson['styles'] = {}
    switch(self.preproOption){
      case 'scss':
        configJson['styles']['src'] = self.rootFolder + 'src/styles/*.scss';
        configJson['styles']['watch'] = self.rootFolder + 'src/styles/**/*.scss';
      break;

      case 'stylus':
      configJson['styles']['src'] = self.rootFolder + 'src/styles/*.styl';
      configJson['styles']['watch'] = self.rootFolder + 'src/styles/**/*.styl';
      break;

      case 'less':
      configJson['styles']['src'] = self.rootFolder + 'src/styles/*.less';
      configJson['styles']['watch'] = self.rootFolder + 'src/styles/**/*.less';
      break;
    }
    configJson['styles']['build'] = self.rootFolder + 'src/html/tempcss/';



    configJson['img'] = {};
    configJson['img']['src'] = self.rootFolder + 'src/html/versions/**/img/*';
    configJson['img']['build'] = self.rootFolder + 'dest/';


    configJson['html'] = {};

    if(self.templateOption === 'jade'){
      configJson['html']['src'] = self.rootFolder + 'src/html/versions/**/*.jade';
      configJson['html']['watch'] = self.rootFolder + 'src/html/**/*.jade';
    }

    if(self.templateOption === 'pug'){
      configJson['html']['src'] = self.rootFolder + 'src/html/versions/**/*.pug';
      configJson['html']['watch'] = self.rootFolder + 'src/html/**/*.pug';
    }


    if(self.templateOption === 'nunjucks'){
      configJson['html']['src'] = self.rootFolder + 'src/html/versions/**/*.html';
      configJson['html']['watch'] = self.rootFolder + 'src/html/**/*.html';
      configJson['html']['templates'] = 'nunjucks templates';
    }
    configJson['html']['build'] = self.rootFolder + 'dest/';

    cb(configJson);
  }

}

module.exports = writeConfig;
