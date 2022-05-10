import { gql } from 'apollo-server'

import { currentStateByRoom } from '../inMemoryProjections/paintState'

const queryTypeDefs = gql`
  type Query {
    painting(room: Room!): [Pixel]
  }
`;

const queryResolvers = {
  painting: (_, args) => currentStateByRoom[args.room].map((color, pixelIndex) => ({ color, pixelIndex }))
};

export {
  queryResolvers,
  queryTypeDefs
}