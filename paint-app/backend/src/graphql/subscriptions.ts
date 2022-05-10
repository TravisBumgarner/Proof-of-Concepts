import { gql } from 'apollo-server'
import { RedisPubSub } from 'graphql-redis-subscriptions';
const pubsub = new RedisPubSub();

const subscriptionTypeDefs = gql`
  type Subscription {
    hello: String
    paintEvent: [Pixel]
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
  paintEvent: {
    subscribe: () => pubsub.asyncIterator('PAINT_EVENT'),
  }
};


export {
  subscriptionResolvers,
  subscriptionTypeDefs
}