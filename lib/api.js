/*eslint global-require: "off"*/
"use strict";

module.exports = {
  config: require('../config/config.js'),
  github: require('./github.js'),
  shell: require('./shell-promise.js'),
  http: require('./http.js')
};
