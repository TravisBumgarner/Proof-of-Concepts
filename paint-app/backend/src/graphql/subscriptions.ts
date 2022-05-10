import { gql } from 'apollo-server'
import { RedisPubSub } from 'graphql-redis-subscriptions';
const pubsub = new RedisPubSub();

const subscriptionTypeDefs = gql`
  type Subscription {
    hello: String
    colorCreated: [Color]
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
  }
};


export {
  subscriptionResolvers,
  subscriptionTypeDefs
}