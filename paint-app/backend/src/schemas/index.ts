import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';
import { gql } from 'apollo-server'

const pubsub = new PubSub();


const typeDefs = gql`
  type Color {
    color: String
    index: Int
  }

  type Query {
    colors: [Color]
  }
  
  type Subscription {
    hello: String
    colorCreated: [Color]
  }
`;

const colors = [
  {index: 0, color: '#000000'},
  {index: 1, color: '#000000'},
  {index: 2, color: '#000000'}
];


const resolvers = {
  Query: {
    colors: () => colors,
  },
  Subscription: {
    hello: {
      subscribe: async function* () {
        for await (const word of ["Hello", "Bonjour", "Ciao"]) {
          yield { hello: word };
        }
      },
    },
    colorCreated: {
      subscribe: () => pubsub.asyncIterator(['COLOR_CREATED']),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export {
    schema,
    pubsub
}