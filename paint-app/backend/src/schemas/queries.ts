import { gql } from 'apollo-server'

import currentStateByRoom from '../projections/currentStateByRoom'

const queryTypeDefs = gql`
  type Query {
    colors(room: Room!): [Color]
  }
`;

const queryResolvers = {
    colors: (_, args) => currentStateByRoom[args.room].map((color, index) => ({ color, index }))
};

export {
  queryResolvers,
  queryTypeDefs
}