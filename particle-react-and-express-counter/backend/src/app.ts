require('dotenv').config()
import express from 'express';
import cors from 'cors'
import bodyParser, { raw } from 'body-parser';

import { MongoClient } from "mongodb";

const getClient = async () => {
  // This bad, I'm lazy.
  const client = new MongoClient('mongodb://root:password@localhost:27123/?authMechanism=DEFAULT');
  const conn = await client.connect();
  return conn.db("counter");
}

const app = express()

// Body Parsing
app.use(bodyParser.urlencoded({
  extended: true
}));

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

type RawCounterEvent = {
  event: 'counterEvent',
  data: string // '9',
  published_at: string // '2023-04-26T02:24:00.652Z',
  coreid: string // 'e00fce687cc15f2e42da5d0a'
}

type ParsedCounterEvent = {
  event: 'counterEvent',
  data: number // '9',
  publishedAt: Date // '2023-04-26T02:24:00.652Z',
  id: string // 'e00fce687cc15f2e42da5d0a'
}

type ParsedEvent =
  | ParsedCounterEvent

type RawEvent =
  | RawCounterEvent

const parseEvent = ({ event, data, published_at, coreid }: RawEvent): ParsedEvent => {
  const parsedPublishedAt = new Date(published_at)
  let parsedData
  switch (event) {
    case 'counterEvent': {
      parsedData = parseInt(data)
      return {
        id: coreid,
        event,
        data: parsedData,
        publishedAt: parsedPublishedAt
      }
    }
    default: {
      throw new Error("Received unknown event")
    }
  }

}



app.post('/webhook', async (req: express.Request, res: express.Response) => {
  const rawEvent = (req.body as RawEvent)

  const parsedEvent = parseEvent(rawEvent)

  switch (parsedEvent.event) {
    case 'counterEvent': {
      const db = await getClient()
      let collection = await db.collection("counter");
      collection.insertOne({ date: parsedEvent.publishedAt, counter: parsedEvent.data })
      break
    }
    default: {
      throw new Error("Received unknown event")
    }
  }

  res.send('success')
})

export default app