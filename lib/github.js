const config = require('../config/config.js');
const http = require('./http.js');
const log = require('iphb-logs');
const fs = require('fs-promise');
const prompt = require('prompt');

const _error = (e, msg) => {
  log.error(msg);
  log.debug(e.message);
  log.verbose(e.stack);
  return e;
};

const _getUserCredentials = () => config.username && config.password
  ? Promise.resolve()
  : new Promise((resolve, reject) => {

    prompt.message = "";
    prompt.delimiter = "";

    log.info("Please provide your GitHub Credentials");
    prompt.start();

    const _promptProperties = [{
      name: 'username'
    }, {
      name: 'api_key',
      hidden: true
    }];
    prompt.get(_promptProperties, (err, result) => {
      if (err) {
        reject(err);
      }

      config.username = result.username;
      config.password = result.api_key;
      log.warn("Downloading all the repos can take a little bit...");
      return resolve();
    });
  });

const _getAllResultsByPage = (url, repos) => new Promise((resolve, reject) => http.get(url)
  .then(response => {
    const status = response[0];
    const headers = response[1];
    const body = response[2];

    if (status !== 200) {
      log.verbose("Status: ", status);
      if (status === 404 && ~url.indexOf('/orgs')) {
        log.debug(`Retrying ${url} replacing /orgs with /users`);
        return resolve(_getAllResultsByPage(url.replace('/orgs', '/users'), repos));
      }
      return reject(new Error("Bad Response from GitHub"));
    }

    const reposWeJustFound = JSON.parse(body);
    const allTheReposCombined = repos
      ? reposWeJustFound.concat(repos)
      : reposWeJustFound;

    if (reposWeJustFound && reposWeJustFound.message && reposWeJustFound.message === "Bad credentials") {
      throw new Error("Login Error: Bad Credentials");
    }

    try {
      const _nextPage = headers.link
        .split(',')
        .filter(link => ~link.indexOf("next"))[0]
        .split("<")[1].split(">")[0];
      return resolve(_getAllResultsByPage(_nextPage, allTheReposCombined));
    } catch (e) {
      // No Next Page
    }

    return resolve(allTheReposCombined);
  })
  .catch(e => reject(_error(e, "Error in _getAllResultsByPage")))
);

module.exports = {
  updateCache: (orgs, cacheFile) => _getUserCredentials()
    .then(() => {
      const work = [];
      orgs.forEach(org => {
        work.push(_getAllResultsByPage(`${config.githubApiUrl}/orgs/${org}/repos?per_page=${config.githubMaxConcurrency}`));
      });
      return Promise.all(work);
    })
    .then(allResults => [].concat(...allResults))
    .then(allRepos => fs.writeFile(
        cacheFile, JSON.stringify(allRepos, null, 2), 'utf8'
      )
      .then(() => allRepos)
    ),
  getGithubReposByCache: cacheFile => fs.readFile(cacheFile, 'utf8')
    .then(fileContents => JSON.parse(fileContents))
    .catch(() => {
      log.error("Cache File Malformed");
      log.warn("Try again");
      // return fs.unlink(cacheFile)
      //   .then(() => process.exit(1));
    })
};
