# Warnings

- I have not setup a backend for this app. The Open Weather API key shouldn't be stored the way it is in utilities.ts. I'd recommend setting up your own server to fetch the API weather and return it.

# Setup

1. Get an API key from Open Weather and add it to utilities.js
2. `npm install`
3. To run locally: `npm run compile` && `npm run cli`  

# How to deploy an NPM App

1. Add the following to your package JSON

```
  "name": "your-app-name",
  "version": "1.0.0",
  "bin": {
    "the-command-to-run-in-the-cli": "./dist/cli.js"
  },
```
2. Add `#!/usr/bin/env node` to your app entrypoint so the CLI runs it as node and not a bash script
3. Deploy to NPM (After creating an account)

`npm run compile && npm publish`

`npm i -g your-app-name`

`the-command-to-run-in-the-cli`

Notes

- When redeploying, you'll need to increment the version.
- Sometimes deployment fails and you'll need to deploy a new version
- I made a mess of things trying to get TypeScript and Webpack configured correctly. This is why `npm run addShebang` exists. 