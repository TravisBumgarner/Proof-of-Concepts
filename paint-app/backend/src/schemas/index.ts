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

  type Mutation {
    createColor(color: String, index: Int): Color
  }
`;

const THIS_IS_THE_SOURCE_OF_TRUTH_LOL = [
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
];


const resolvers = {
  Query: {
    colors: () => THIS_IS_THE_SOURCE_OF_TRUTH_LOL.map((color, index) => ({color, index})),
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
  Mutation: {
    createColor: async (_, {color, index}) => {
      THIS_IS_THE_SOURCE_OF_TRUTH_LOL[index] = color
      console.log(THIS_IS_THE_SOURCE_OF_TRUTH_LOL)
      await pubsub.publish('COLOR_CREATED', {
        colorCreated: [{
          index,
          color
        }]
      });
      return {color, index}
    }
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export {
    schema,
    pubsub
}