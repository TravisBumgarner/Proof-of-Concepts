import { gql } from 'apollo-server'

const sharedTypeDefs = gql`
  type Pixel {
    color: String!
    pixelIndex: Int!
    room: String!
  }

  type RoomRoom {
    id: String!
    title: String!
  }
`;

export {
    sharedTypeDefs
}