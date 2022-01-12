import express, { Request, Response } from 'express'
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,

} = require('graphql')

import * as dbQueries from './db/queries'
import { Book, Author } from './types'

const app = express()

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: async (book: Book) => {
                const data = await dbQueries.selectAuthorsByIds([book.id])
                return data[0]
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents a author of a book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: new GraphQLList(BookType),
            resolve: (author: Author) => {
                return dbQueries.selectBooksByAuthorIds([author.id])
            }
        }
    })
})

type BookQueryArgs = {
    ids?: number[]
}

type AuthorQueryArgs = {
    ids?: number[]
}

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: 'List of Some/All Books',
            args: {
                ids: { type: GraphQLList(GraphQLInt) }
            },
            resolve: (parent: any, args: BookQueryArgs) => dbQueries.selectBooksByIds(args.ids)

        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'List of All Authors',
            args: {
                ids: { type: GraphQLList(GraphQLInt) }
            },
            resolve: (parent: any, args: AuthorQueryArgs) => dbQueries.selectAuthorsByIds(args.ids)
        }
    })
})

type BookMutationArgs = {
    name: string
    authorId: number
}

type AuthorMutationArgs = {
    name: string
}

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addAuthor: {
            type: AuthorType,
            description: 'Add an author',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent: undefined, args: AuthorMutationArgs) => dbQueries.insertAuthorByName(args.name)
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

app.get('/', async (req: Request, res: Response) => {
    await dbQueries.insertAuthorByName('foo')
    return res.send('success')
})

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))
app.listen(5000, () => console.log('Server Running'))