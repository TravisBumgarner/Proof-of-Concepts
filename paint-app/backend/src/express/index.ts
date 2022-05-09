import express from 'express';
import cors from 'cors'
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServer } from 'apollo-server'
import { RedisPubSub } from 'graphql-redis-subscriptions';
const pubsub = new RedisPubSub();

import { schema } from '../graphql'

const app = express()
app.use(cors())

app.get('/', async (req: express.Request, res: express.Response) => {
  pubsub.publish('test', {test: 'test'});

  res.send('pong!')
})

const httpServer = createServer(app);

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });

const serverCleanup = useServer({ schema }, wsServer);

export {
  apolloServer,
  httpServer
}

