import { gql } from 'apollo-server'
import { RedisPubSub } from 'graphql-redis-subscriptions';
const pubsub = new RedisPubSub();

// import { pubsub } from './mutations';

const subscriptionTypeDefs = gql`
  type Subscription {
    hello: String
    colorCreated: [Color]
    test: String
  }
`;

const subscriptionResolvers = {
  hello: {
    subscribe: async function* () {
      for await (const word of ["Hello", "Bonjour", "Ciao"]) {
        yield { hello: word };
      }
    },
  },
  colorCreated: {
    subscribe: () => pubsub.asyncIterator('COLOR_CREATED'),
  },
  test: {
    subscribe: () => pubsub.asyncIterator('test'),
  },
};


export {
  subscriptionResolvers,
  subscriptionTypeDefs
}