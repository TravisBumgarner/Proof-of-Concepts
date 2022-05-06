# PR-1

- [x] Do some refactoring
- [x] Refactor eventstore code
- [x] Add index files
- [x] Refactor createConnection to getConnection
- [ ] Setup first eventstore projection with postgres
- [ ] Redis time?
- [ ] Get rid of pubsub, including library
- [ ] Figure out how to write sendEvent tpe more cleanly
- [x] Add eventstore to keep track of painting.
Notes

Implement this.
```
const main = async () => {
    await client.connect();
    client.del('paint-foo')
    const data = []
    for (let i = 0; i < 100; i++){
        data.push(i, "FFFFFF")
    }
    client.hSet('paint-foo', data)
    await setColor(client, 0, "00FF00")
    await setColor(client, 95, "FFFF00")
    await setColor(client, 99, "FFFFFF")
    elements = await client.hGetAll( "paint-foo")
    console.log(Object.values(elements))
    await client.disconnect()
}

const setColor = async (client, index, color) => {
    await client.hSet('paint-foo', index, color)
}

main()
```


- Start batching events
- if Hydrating, perhaps tell the user to refresh the page.
- Look at sharing graphql types between FE/BE (Talk to Bri)
- setup room creation - See how that propogates through to new stream, new stream handler, etc. 

- There will be no Mutations. Or will there?
- Should all communication be done via websockets after initial fetch? Or maybe have an initial fetch