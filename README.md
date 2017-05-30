# Overview

Given a list of GitHub users or orgs, caches all the GitHub metadata and makes searching and cloning repos super fast.

## What is it

```bash
➜  ~ clone blog   
[Info]    [0]: bhudgens/blog
select 0
[Info]    Cloning into 'blog'...
```

## Help:

```bash
➜  ~ clone -h
Usage:
  clone <repo>
  clone [options]

Options:
  -c --config                      Display the Environment
  -d --debug                       Enable Debug Log Output
  -f --forceCacheUpdate            Purge the current repo cache
  -h --help                        Show this help
  -s --search <repo>               Search for repo named $repo
  -v --verbose                     Enable Verbose Log Output

Additional Options:
  --logging <logging>
  --debug <debug>
  --verbose <verbose>
  --username <username>
  --password <password>
  --githubApiUrl <githubApiUrl>
  --githubOrgs <githubOrgs>
  --githubMaxConcurrency <githubMaxConcurrency>
  --githubAuthHeader <githubAuthHeader>
  --repoCacheFile <repoCacheFile>

Cache all repos for the orgs or users specified in the GITHUB_ORGS
environment variable.

Examples:

  # clone --githubOrgs 'org1,org1,org3,user1,user2'

  Orgs in your environment

  # export GITHUB_ORGS="org1,org1,org3,user1,user2"
  # clone

  Trim the results by providing a search

  # clone 'search'
```
