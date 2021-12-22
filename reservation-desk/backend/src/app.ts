import * as express from 'express';

const app = express()

// const db = require('./db')

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})


// app.get('/', async (req, res) => {
//   return res.json(await db.selectAll())
// })

export default app