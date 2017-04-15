"use strict";

/********************************************************************
 * Configuration
 ********************************************************************/

/*eslint no-process-env: "off"*/
/*eslint no-void: "off"*/

module.exports = {
  logging: typeof process.env.ENABLE_LOGGING !== "undefined",
  debug: typeof process.env.ENABLE_DEBUG !== "undefined",
  verbose: typeof process.env.ENABLE_VERBOSE !== "undefined",
  username: process.env.GITHUB_USERNAME,
  password: process.env.GITHUB_PASSWORD,
  githubApiUrl: process.env.GITHUB_API_URL || "https://api.github.com",
  githubOrgs: process.env.GITHUB_ORGS,
  githubMaxConcurrency: process.env.GITHUB_MAXCONCURRENCY || 100,
  githubAuthHeader: process.env.GITHUB_AUTH_HEADER,
  repoCacheFile: process.env.REPO_CACHE_FILE || `${process.env.HOME}/Library/Caches/repocache`
};
