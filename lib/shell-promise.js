/*eslint no-console: "off"*/
/*eslint no-confusing-arrow: "off"*/
"use strict";

const exec = require('child_process').exec;

module.exports = {
  run: command => new Promise((resolve, reject) => exec(command, (err, stdout, stderr) => err
    ? reject([err, stdout, stderr])
    : resolve([err, stdout, stderr])))
};
