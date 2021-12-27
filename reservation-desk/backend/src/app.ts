let WSServer = require('ws').Server;
import { createServer } from 'http'
import { createClient, RedisClientType } from 'redis';

import { ACTIONS, Action, LoginAction } from '../../types/websockets'

const server = createServer()

let wsServer = new WSServer({ server })

const NEW_MESSAGES = 'newMessages'
const CURRENT_MESSAGES = 'currentMessages'

const messageHandler = async (action: Action) => {
  switch (action.type) {
    case ACTIONS.LOGIN: {
      const publisher = await createClient()
      await publisher.connect();
      await publisher.sAdd('users', action.user)
      break
    }
    case ACTIONS.LOGOUT: {
      const publisher = await createClient()
      await publisher.connect();
      await publisher.sRem('users', action.user)
      break
    }
    default: {
      console.error("swalling action", action)
      break
    }
  }
}

wsServer.on('connection', async (ws: any) => { // Todo: What goes here?
  // const subscriber = await createClient()
  // await subscriber.connect();
  // console.log('subscriber connected')

  // const publisher = await createClient()
  // await publisher.connect()
  // console.log('publisher connected')

  // const currentMessages = await subscriber.lRange(CURRENT_MESSAGES, 0, -1)
  // await ws.send(JSON.stringify(currentMessages));

  // await subscriber.subscribe(NEW_MESSAGES, (message) => {
  //   ws.send(JSON.stringify(message));
  // });

  ws.on('message', async (message: string) => {
    // const [_a, _b] = await publisher
    //   .multi()
    //   .publish(NEW_MESSAGES, message)
    //   .rPush(CURRENT_MESSAGES, message)
    //   .exec();
    const parsedMessage: Action = JSON.parse(message)
    console.log(parsedMessage)
    await messageHandler(parsedMessage)
    wsServer.clients
      .forEach((client: any) => {
        console.log('messaging clients')
        client.send(JSON.stringify(parsedMessage))
      })
  });
});

export default server