import { gql } from 'apollo-server'

import { currentStateByRoom } from '../inMemoryProjections/paintState'

const queryTypeDefs = gql`
  type Query {
    colors(room: Room!): [Color]
  }
`;

const queryResolvers = {
  colors: (_, args) => currentStateByRoom[args.room].map((color, pixelIndex) => ({ color, pixelIndex }))
};

export {
  queryResolvers,
  queryTypeDefs
}