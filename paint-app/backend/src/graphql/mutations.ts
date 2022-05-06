import { PubSub } from 'graphql-subscriptions';
import { gql } from 'apollo-server'

import { EEventName } from '../eventstore/eventTypes';
import currentStateByRoom from '../inMemoryProjections/currentStateByRoom'
import sendEvent from '../eventstore/sendEvent'


const pubsub = new PubSub();

const mutationTypeDefs = gql`
  type Mutation {
    createColor(color: String!, index: Int!, room: Room!): Color
  }
`;

const mutationResolvers = {
    createColor: async (_, { color, index, room }) => {
        currentStateByRoom[room][index] = color

        await sendEvent(EEventName.TPaintEvent, `paint-${room}`, [{color, index}])

        await pubsub.publish('COLOR_CREATED', {
            colorCreated: [{
                index,
                color,
                room
            }]
        });
        return { color, index, room }
    }
};

export {
    mutationTypeDefs,
    mutationResolvers,
    pubsub
}