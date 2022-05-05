import {
    GraphQLSchema,
} from 'graphql'

import RootQueryType from './queries'
import RootSubscriptionType from './subscriptions'

const schema = new GraphQLSchema({
    query: RootQueryType,
    subscription: RootSubscriptionType
})

export default schema
