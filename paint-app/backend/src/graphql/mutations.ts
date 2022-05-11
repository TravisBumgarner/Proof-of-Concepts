import { RedisPubSub } from 'graphql-redis-subscriptions';
import { gql } from 'apollo-server'

import { EEventName } from '../eventstore/eventTypes';
import {currentStateByRoom} from '../inMemoryProjections/paintState'
import sendEvent from '../eventstore/sendEvent'

const mutationTypeDefs = gql`
  type Mutation {
    paintEvent(color: String!, pixelIndex: Int!, room: String!): Pixel
    createRoom(id: String!, title: String!): RoomRoom
  }
`;

const mutationResolvers = {
    paintEvent: async (_, { color, pixelIndex, room }) => {
        currentStateByRoom[room][pixelIndex] = color

        await sendEvent(EEventName.TPaintEvent, `paint-${room}`, [{color, pixelIndex}])
        return { color, pixelIndex, room }
    },
    createRoom: async (_, {title, id}) => {
      await sendEvent(EEventName.NewRoomEvent, `newroom`, {id, title})
      return { title, id }
    }
};

export {
    mutationTypeDefs,
    mutationResolvers
}