import {
    GraphQLSchema,
} from 'graphql'

import RootQueryType from './queries'

const schema = new GraphQLSchema({
    query: RootQueryType,
})

export default schema
