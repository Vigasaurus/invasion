# invasion

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Front end: React, Redux, Sass, Ant Design, SocketIO.

Back end: Node v8, Express, Pug, Passport, Mongodb with Mongoose, SocketIO.

## Installation

Install [node.js latest version](https://nodejs.org/en/), have it in your path.

Install [git](https://git-scm.com/downloads), have it in your path.

Install [mongodb](https://www.mongodb.com/download-center?ct=atlasheader#community), have it in your path.

Install [yarn](https://yarnpkg.com/en/docs/install) for your OS.

then

```bash
git clone https://github.com/cozuya/invasion.git
cd invasion
yarn
```

## Running in dev mode

Start development:

```bash
yarn dev
```

Navigate to: http://localhost:8080

You'll most likely need a browser extension such as Chrome's [openMultiLogin](https://chrome.google.com/webstore/detail/openmultilogin/lbofelamdnfmipbbgkebcpkapahbmcgm?hl=en) to have multiple sessions on the same browser. No, incognito will not work. When developing in Chrome, you'll want to check "diable cache" on the network tab - my webpack setup isn't great and it doesn't cache bust itself. Also it will be very helpful to make all of the "quickdefault" accounts with the default password, snipsnap, so that you can log in to an account in one click. There is a yarn script you may run once `server` or `dev` yarn scripts are already running called `create-accounts` which will attempt to populate all of the helper accounts into the database.

```bash
yarn create-accounts
```
