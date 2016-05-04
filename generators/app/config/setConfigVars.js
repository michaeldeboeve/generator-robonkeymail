'use strict';
var path = require('path');

function setConfigVars(self, cb){

  self.gulpDirOption = self.cfg.gulpDirOption;
  self.gulpTypeOption = self.cfg.gulpTypeOption;

  self.rootFolder = './';
  if(self.gulpDirOption) self.rootFolder = '../';

  self.preproOption = self.cfg.preproOption;
  self.templateOption = self.cfg.templateOption;

  cb();
}

module.exports = setConfigVars;
