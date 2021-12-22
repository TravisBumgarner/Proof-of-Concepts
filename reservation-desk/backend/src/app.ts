import express from 'express'
const app = express()

import db from './db'

app.get('/', (request: express.Request, response: express.Response) => {
  response.send('pong!')
})


app.get('/data', async (req: express.Request, res: express.Response) => {
  return res.json(await db.selectAll())
})

export default app