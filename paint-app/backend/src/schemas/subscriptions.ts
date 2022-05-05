import {
    GraphQLList,
    GraphQLObjectType, GraphQLString,
} from 'graphql'

const getRandomColor = () => {
    const colors = ['red', 'green', 'blue', 'yellow']
    return colors[Math.floor(Math.random() * colors.length)];
}

const colors = {
    type: new GraphQLList(GraphQLString),
    description: 'Colors',
    args: {},
    resolve: async () => {
        return [getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor()]
    },
}

const RootQueryType = new GraphQLObjectType({
    name: 'Subscription',
    description: 'Root Subscription',
    fields: () => ({
        colors
    }),
})

export default RootQueryType
