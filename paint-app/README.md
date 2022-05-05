# Setup

1. `npm run fill-it` to install dependencies
2. (on initial setup) Switch to the backend and run `npm run migration:run`
3. `npm run sd` to launch app

Notes

- eventHandler will complain about a lack of a Postgres connection. This is a race condition I couldn't figure out how to resolve with `wait-on` once PG is up just save a page in the backend to force a hot reload.
