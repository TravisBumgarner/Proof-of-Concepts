import express from 'express';
import cors from 'cors'
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServer } from 'apollo-server'

import { schema } from '../graphql'

const app = express()
app.use(cors())

app.get('/', async (req: express.Request, res: express.Response) => {
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
