require('dotenv').config()
import express from 'express';
import cors from 'cors'

import { MongoClient } from "mongodb";

const getClient = async () => {
  // This bad, I'm lazy.
  const client = new MongoClient('mongodb://root:password@localhost:27123/?authMechanism=DEFAULT');
  const conn = await client.connect();
  return conn.db("counter");
}

const app = express()

// Body Parsing
app.use(express.json());

// Cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(cors({ origin: ['localhost:3000',] }))

app.get('/', (req: express.Request, res: express.Response) => {

  res.send('pong!')
})


app.get('/webhook', async (req: express.Request, res: express.Response) => {
  const db = await getClient()
  let collection = await db.collection("counter");
  collection.insertOne({ date: new Date(), counter: Math.random() })

  res.send('success')
})

export default app