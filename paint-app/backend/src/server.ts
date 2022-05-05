import express from 'express';
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'

import schema from './schemas'

const app = express()
app.use(cors())

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})

app.use('/graphql', graphqlHTTP((req: express.Request) => ({
  schema,
  graphiql: true,
})))

const port = 5001

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })