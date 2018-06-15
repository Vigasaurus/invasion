# invasion

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Considering contributing to this project? Please read our brief guidelines found at
[CONTRIBUTING](https://github.com/cozuya/secret-hitler/blob/master/CONTRIBUTING.md). Contributors get a cool teal playername color!

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

## Important note for Windows users

After much struggling, I have determined there is something wrong in NodeJS LTS itself. You MUST USE NODE JS v6.13.1, not "Node JS" i.e. the LTS version. For more info: https://stackoverflow.com/questions/49091270/why-is-socket-io-is-very-slow-on-windows/49212490#49212490

## Running in production mode

I'll leave you to figure that out.
