import { gql } from 'apollo-server'

const sharedTypeDefs = gql`
  enum Room {
    modernism
    justChillin,
    abstract
  }

  type Pixel {
    color: String!
    pixelIndex: Int!
    room: Room!
  }
`;

export {
    sharedTypeDefs
}