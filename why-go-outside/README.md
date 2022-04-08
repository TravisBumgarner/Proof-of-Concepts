# Warnings

- I have not setup a backend for this app. The `OPEN_WEATHER_API_KEY` in the `.env` shouldn't be stored the way it is. I'd recommend setting up your own server to fetch the API weather and return it.

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