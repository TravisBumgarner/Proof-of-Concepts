# PR-1

- [x] Do some refactoring
- [x] Refactor eventstore code
- [x] Add index files
- [x] Refactor createConnection to getConnection
- [x] Setup first eventstore projection with postgres
- [x] Add query to fetch data from Postgres
- [x] Redis time?
- [x] Fix bug with room changing not working
- [x] Figure out how to get pubsub in Event handler
    - does it need to be there?
- [x] Add eventstore to keep track of painting.
- [x] Add painting for real
- [x] Clean up variable names
- [x] Setup history playback
- [ ] Add a way to create a room
Notes



- Start batching events
- if Hydrating, perhaps tell the user to refresh the page.
- Look at sharing graphql types between FE/BE (Talk to Bri)
- setup room creation - See how that propogates through to new stream, new stream handler, etc. 

- There will be no Mutations. Or will there?
- Should all communication be done via websockets after initial fetch? Or maybe have an initial fetch