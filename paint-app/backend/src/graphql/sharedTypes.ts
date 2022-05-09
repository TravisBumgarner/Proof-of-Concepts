import { gql } from 'apollo-server'

const sharedTypeDefs = gql`
  enum Room {
    modernism
    justChillin,
    abstract
  }

  type Color {
    color: String!
    pixelIndex: Int!
    room: Room!
  }
`;

export {
    sharedTypeDefs
}