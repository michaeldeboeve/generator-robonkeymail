var writePackage = require('./writePackage'),
    writeConfig  = require('./writeConfig'),
    mkdirp       = require('mkdirp'),
    path         = require('path');

'use strict';

function setConfigFiles(self, cb){
  setyorc(self, function(){
    setconfig(self, function(){
      setpackage(self, function(){
        cb();
      });
    });
  });
}


// saving yo-rc file
function setyorc(self, cb){
  // console.log(self.cfg)
  self.config.set(self.cfg);

  cb();
}

// saving config file
function setconfig(self, cb){
  var configFile  = './config.json',
      destRoot    = self.destinationRoot()
  if(self.gulpDirOption) {
    mkdirp(path.join(destRoot, 'gulp'));
    configFile  = './gulp/config.json'
  };
  writeConfig(configFile, self);

  cb();
}

// setting the package
function setpackage(self, cb){
  var packageFile   = './package.json',
      destRoot      = self.destinationRoot()
  if(self.gulpDirOption) {
    mkdirp(path.join(destRoot, 'gulp'));
    packageFile = './gulp/package.json'
  };
  writePackage(packageFile, self);

  cb();
}

module.exports = setConfigFiles;
