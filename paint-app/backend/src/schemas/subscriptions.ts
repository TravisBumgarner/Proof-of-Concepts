import { gql } from 'apollo-server'

import { pubsub } from './mutations';

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
      subscribe: () => pubsub.asyncIterator(['COLOR_CREATED']),
    },
};


export {
    subscriptionResolvers,
    subscriptionTypeDefs
}