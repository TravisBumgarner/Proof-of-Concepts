import express from 'express';
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServer } from 'apollo-server'
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    colors: [String]
  }

  type Subscription {
    hello: String
    colorCreated: String
  }
  
  type Post {
    author: String
    comment: String
  }

  type Subscription {
    postCreated: Post
  }

  subscription PostFeed {
    postCreated {
      author
      comment
    }
  }
`;

const colors = [
  'red',
  'blue',
  'green',
];


const resolvers = {
  Query: {
    colors: () => colors,
  },
  Subscription: {
    hello: {
      // Example using an async generator
      subscribe: async function* () {
        for await (const word of ["Hello", "Bonjour", "Ciao"]) {
          yield { hello: word };
        }
      },
    },
    postCreated: {
      // More on pubsub below
      subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
    },
  },
};

export { typeDefs, resolvers }

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express()
app.use(cors())


app.get('/', async (req: express.Request, res: express.Response) => {
  await pubsub.publish('POST_CREATED', {
    postCreated: {
      author: 'Ali Baba',
      comment: 'Open sesame'
    }
  });
  res.send('pong!')
})

const httpServer = createServer(app);

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
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

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if your ApolloServer serves at
  // a different path.
  path: '/graphql',
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

apolloServer.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
httpServer.listen(5001, () => console.log("http server listening 5001"))