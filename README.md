# Overview

Given a list of GitHub users or orgs, caches all the GitHub metadata and makes searching and cloning repos super fast.

## What is it

```bash
➜  ~ clone blog   
[Info]    [0]: bhudgens/blog
select 0
[Info]    Cloning into 'blog'...
```

## Loading the Cache

To authenticate with this tool, create a [personal access token](https://github.com/settings/tokens) with 'repo' access.  (You will want to make sure the key is authorized for SSO if you work at a company with SSO enabled.)  Use your normal username and the access key as your password.

If you want to use your normal credentials but you do not have 2FA activated - you can hit enter at the 2FA prompt and leave it blank.

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

Examples:

  # Cache all repos you have access to under a list of companies and orgs
  clone -f --githubOrgs 'org1,org1,org3,user1,user2'

    -or-

  export GITHUB_ORGS="org1,org1,org3,user1,user2"
  clone -f

  # Search for a repo to clone after cache above is complete
  clone $repo
```
