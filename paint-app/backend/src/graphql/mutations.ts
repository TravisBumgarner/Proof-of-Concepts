import { RedisPubSub } from 'graphql-redis-subscriptions';
import { gql } from 'apollo-server'

import { EEventName } from '../eventstore/eventTypes';
import {currentStateByRoom} from '../inMemoryProjections/paintState'
import sendEvent from '../eventstore/sendEvent'

const mutationTypeDefs = gql`
  type Mutation {
    paintEvent(color: String!, pixelIndex: Int!, room: Room!): Pixel
  }
`;

const mutationResolvers = {
    paintEvent: async (_, { color, pixelIndex, room }) => {
        currentStateByRoom[room][pixelIndex] = color

        await sendEvent(EEventName.TPaintEvent, `paint-${room}`, [{color, pixelIndex}])
        return { color, pixelIndex, room }
    }
};

export {
    mutationTypeDefs,
    mutationResolvers
}