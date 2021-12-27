let WSServer = require('ws').Server;
import { createServer } from 'http'
import { createClient, RedisClientType } from 'redis';

const server = createServer()

let wsServer = new WSServer({ server })

const NEW_MESSAGES = 'newMessages'
const CURRENT_MESSAGES = 'currentMessages'



wsServer.on('connection', async (ws: any) => { // Todo: What goes here?
  ws.on('message', async (message: string) => {
    console.log("websocket connected")
    const parsedMessage = JSON.parse(message)

    wsServer.clients
      .forEach((client: any) => {
        console.log('messaging clients', JSON.stringify(parsedMessage))
        client.send(JSON.stringify(parsedMessage))
      })
  });
});

export default server