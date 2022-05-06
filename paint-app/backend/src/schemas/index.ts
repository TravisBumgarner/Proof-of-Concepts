import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';
import { gql } from 'apollo-server'

const pubsub = new PubSub();


const typeDefs = gql`
  enum Room {
    modernism
    justChillin,
    abstract
  }

  type Color {
    color: String!
    index: Int!
    room: Room!
  }

  type Query {
    colors(room: Room!): [Color]
  }
  
  type Subscription {
    hello: String
    colorCreated: [Color]
  }

  type Mutation {
    createColor(color: String!, index: Int!, room: Room!): Color
  }
`;

const THIS_IS_THE_SOURCE_OF_TRUTH_LOL = Array.apply(null, Array(100)).map(() => "#00FF00")

enum ROOMS {
  modernism = "modernism",
  justChillin = "justChillin",
  abstract = "abstract"
}

const SourceOfTruthByRoom = {
  [ROOMS.modernism]: [...THIS_IS_THE_SOURCE_OF_TRUTH_LOL],
  [ROOMS.justChillin]: [...THIS_IS_THE_SOURCE_OF_TRUTH_LOL],
  [ROOMS.abstract]: [...THIS_IS_THE_SOURCE_OF_TRUTH_LOL],
}

const resolvers = {
  Query: {
    colors: (_, args) =>  SourceOfTruthByRoom[args.room].map((color, index) => ({color, index}))
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
    createColor: async (_, {color, index, room}) => {
      SourceOfTruthByRoom[room][index] = color
      await pubsub.publish('COLOR_CREATED', {
        colorCreated: [{
          index,
          color,
          room
        }]
      });
      return {color, index, room}
    }
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export {
    schema,
    pubsub
}