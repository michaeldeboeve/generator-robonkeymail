'use strict';
var chalk = require('chalk'),
    yosay = require('yosay');

function greeting(self, cb) {
  var message = chalk.yellow.bold('Welcome to Robonkey ') + chalk.yellow('\'Cause everyone needs a Robotic Monkey');
  console.log(yosay(message, {maxLength: 19}));

  cb();
}

module.exports = greeting;
