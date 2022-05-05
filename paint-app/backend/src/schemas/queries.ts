import {
    GraphQLObjectType, GraphQLString,

} from 'graphql'

const ping = {
    type: GraphQLString,
    description: 'A String',
    args: {},
    resolve: async () => {
        return "pong"
    },
}

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        ping
    }),
})

export default RootQueryType
