'use strict';
var chalk = require('chalk'),
    yosay = require('yosay');

var init = function(self, cb) {
    self.cfg = self.config.getAll();

    cb()
}

module.exports = init;
