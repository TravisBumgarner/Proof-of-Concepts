import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';
import { gql } from 'apollo-server'

const pubsub = new PubSub();


const typeDefs = gql`
  type Query {
    colors: [String]
  }

  type Subscription {
    hello: String
  }
  
  type Color {
    color: String
    comment: String
  }

  type Subscription {
    colorCreated: Color
  }

  subscription PostFeed {
    colorCreated {
      color
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
    colorCreated: {
      // More on pubsub below
      subscribe: () => pubsub.asyncIterator(['COLOR_CREATED']),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export {
    schema,
    pubsub
}