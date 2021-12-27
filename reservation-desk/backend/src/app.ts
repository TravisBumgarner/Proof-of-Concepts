let WSServer = require('ws').Server;
import { createServer } from 'http'
import { createClient } from 'redis';

const server = createServer()

let wsServer = new WSServer({ server })

const NEW_MESSAGES = 'newMessages'
const CURRENT_MESSAGES = 'currentMessages'

wsServer.on('connection', async (ws: any) => { // Todo: What goes here?
  // const subscriber = await createClient()
  // await subscriber.connect();

  // const publisher = await createClient()
  // await publisher.connect()

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

    const parsedMessage: any = JSON.parse(message)

    wsServer.clients
      .fsorEach((client: any) => {
        client.send(JSON.stringify(parsedMessage))
      })
  });
});

export default server