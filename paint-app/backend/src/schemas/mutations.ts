import { PubSub } from 'graphql-subscriptions';
import { gql } from 'apollo-server'

import currentStateByRoom from '../projections/currentStateByRoom'

const pubsub = new PubSub();

const mutationTypeDefs = gql`
  type Mutation {
    createColor(color: String!, index: Int!, room: Room!): Color
  }
`;

const mutationResolvers = {
    createColor: async (_, { color, index, room }) => {
        currentStateByRoom[room][index] = color

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