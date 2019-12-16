/*eslint no-ternary: "off"*/
/*eslint global-require: "off"*/
"use strict";

const urlParse = require('url');
const log = require('iphb-logs');
const config = require('../config/config.js');

module.exports = {
  get: url => new Promise((resolve, reject) => {
    const options = typeof url === "object" ? url : urlParse.parse(url);
    const lib = options.protocol.startsWith('https') ? require('https') : require('http');
    options.auth = `${config.username}:${config.password}`;
    options.headers = options.headers || {};
    options.headers["user-agent"] = "Github Cloner";
    log.debug(`GET Request: ${url}`);
    log.verbose(options);
    const request = lib.get(options, response => {
      const body = [];
      response.on('data', chunk => body.push(chunk));
      response.on('end', () => resolve([
        response.statusCode,
        response.headers,
        body.join('')
      ]));
    });
    request.on('error', err => reject(err));
  })
};
