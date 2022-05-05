import express from 'express';
import cors from 'cors'
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServer } from 'apollo-server'

import { schema, pubsub } from './schemas'

const app = express()
app.use(cors())

app.get('/', async (req: express.Request, res: express.Response) => {
  await pubsub.publish('COLOR_CREATED', {
    colorCreated: {
      color: 'red',
      comment: 'Open sesame'
    }
  });
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

apolloServer.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
httpServer.listen(5001, () => console.log("http server listening 5001"))