import { gql } from 'apollo-server'

const sharedTypeDefs = gql`
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
`;

export {
    sharedTypeDefs
}