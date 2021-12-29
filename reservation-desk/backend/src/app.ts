import WebSocket, { WebSocketServer } from 'ws';
import { createServer } from 'http'
import { createClient, RedisClientType } from 'redis';
import {
  WEBSOCKETS_USER_CONNECTED_ACTION_TYPE,
  WEBSOCKETS_USER_DISCONNECTED_ACTION_TYPE,
  WEBSOCKETS_ACTIVE_USERS_ACTION_TYPE,
  WebsocketsAction,
} from '../../types/websockets'

const server = createServer()

let wsServer = new WebSocketServer({ server })

const messageHandler = async (ws: any, action: WebsocketsAction) => {
  switch (action.type) {
    case WEBSOCKETS_USER_CONNECTED_ACTION_TYPE: {
      const redisClient = await createClient()
      await redisClient.connect();
      const activeUsers = await redisClient.sMembers('users')
      await redisClient.sAdd('users', action.user)
      await redisClient.quit()

      // Send other clients that a new user connected
      await wsServer.clients.forEach((wsClient: any) => {
        if (wsClient !== ws && wsClient.readyState === WebSocket.OPEN) {
          wsClient.send(JSON.stringify(action))
        }
      })

      // Respond to Client with other users
      await wsServer.clients.forEach((wsClient: any) => {
        if (wsClient === ws && wsClient.readyState === WebSocket.OPEN) {
          const payload = {
            type: WEBSOCKETS_ACTIVE_USERS_ACTION_TYPE,
            activeUsers
          }
          wsClient.send(JSON.stringify(payload))
        }
      })
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
    messageHandler(ws, parsedMessage)
  });
});

export default server