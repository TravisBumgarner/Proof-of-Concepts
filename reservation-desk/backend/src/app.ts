let WSServer = require('ws').Server;
import { createServer } from 'http'
import { createClient, RedisClientType } from 'redis';
import {
  WEBSOCKETS_USER_CONNECTED_ACTION_TYPE,
  WEBSOCKETS_USER_DISCONNECTED_ACTION_TYPE,
  WebsocketsAction,
} from '../../types/websockets'

const server = createServer()

let wsServer = new WSServer({ server })

const messageHandler = async (action: WebsocketsAction) => {
  switch (action.type) {
    case WEBSOCKETS_USER_CONNECTED_ACTION_TYPE: {
      const publisher = await createClient()
      await publisher.connect();
      await publisher.sAdd('users', action.user)
      await publisher.quit()
      break
    }
    case WEBSOCKETS_USER_DISCONNECTED_ACTION_TYPE: {
      const publisher = await createClient()
      await publisher.connect();
      await publisher.sRem('users', action.user)
      await publisher.quit()
      break
    }
    default: {
      console.error("swallowing action", action)
      break
    }
  }
}

wsServer.on('connection', async (ws: any) => { // Todo: What goes here?
  ws.on('message', async (message: string) => {
    const parsedMessage = JSON.parse(message)
    messageHandler(parsedMessage)
    wsServer.clients
      .forEach((client: any) => {
        client.send(JSON.stringify(parsedMessage))
      })
  });
});

export default server