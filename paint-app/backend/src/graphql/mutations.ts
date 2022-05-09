import { RedisPubSub } from 'graphql-redis-subscriptions';
import { gql } from 'apollo-server'

import { EEventName } from '../eventstore/eventTypes';
import {currentStateByRoom} from '../inMemoryProjections/paintState'
import sendEvent from '../eventstore/sendEvent'


const pubsub = new RedisPubSub();

const mutationTypeDefs = gql`
  type Mutation {
    createColor(color: String!, pixelIndex: Int!, room: Room!): Color
  }
`;

const mutationResolvers = {
    createColor: async (_, { color, pixelIndex, room }) => {
        currentStateByRoom[room][pixelIndex] = color

        await sendEvent(EEventName.TPaintEvent, `paint-${room}`, [{color, pixelIndex}])

        await pubsub.publish('COLOR_CREATED', {
            colorCreated: [{
                pixelIndex,
                color,
                room
            }]
        });
        return { color, pixelIndex, room }
    }
};

export {
    mutationTypeDefs,
    mutationResolvers
}