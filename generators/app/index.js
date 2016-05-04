'use strict';

var yeoman          = require('yeoman-generator'),
    yosay           = require('yosay'),
    fs              = require('fs'),
    path            = require('path'),
    util            = require('util'),
    chalk           = require('chalk'),
    mkdirp          = require('mkdirp');

var init            = require('./config/init'),
    greeting        = require('./helpers/greeting'),
    setConfigFiles  = require('./config/setConfigFiles'),
    setConfigVars   = require('./config/setConfigVars'),
    copyFiles       = require('./config/copyFiles');


var gulpPrompt      = require('./prompts/gulpPrompt'),
    cssPrompt       = require('./prompts/cssPrompt'),
    htmlPrompt      = require('./prompts/htmlPrompt');


module.exports = yeoman.generators.Base.extend({

  initializing: function(){
    var done = this.async(),
        self = this;
    init(this, function(){
      greeting(self, function(){
        done();
      })
    })
  },




  prompting: {
    gulp: function(){
      var done = this.async(),
          self = this;

      gulpPrompt(this, function(){
        done();
      })
    },

    css: function(){
      var done = this.async(),
          self = this;

      cssPrompt(this, function(){
        done();
      })
    },

    html: function(){
      var done = this.async(),
          self = this;

      htmlPrompt(this, function(){
        done();
      })
    },
  },




  configuring: {
    answers: function(){
      var done = this.async(),
          self = this;

      setConfigVars(this, function(){
        setConfigFiles(self, function(){
          done();
        })
      })
    }
  },

  writing: {
    copyfiles: function(){
      var done = this.async(),
          self = this,
          destRoot   = this.destinationRoot(),
          gulpRoot   = destRoot,
          sourceRoot = this.sourceRoot();

      if(this.cfg.gulpDirOption) gulpRoot = path.join(destRoot,'gulp')

      copyFiles(this, destRoot, gulpRoot, sourceRoot, function(){
        done();
      })
    }
  },




  install: function(){
    var done = this.async(),
        self = this;

    if(self.gulpDirOption) {
      // Change working directory to 'gulp' for dependency install
      var gulpDir = path.join(process.cwd(), 'gulp');
      process.chdir(gulpDir);
    }

    this.npmInstall();
    done();
  }

});
