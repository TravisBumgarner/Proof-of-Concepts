require('dotenv').config()
import express from 'express';
import cors from 'cors'
import bodyParser, { raw } from 'body-parser';

import { MongoClient } from "mongodb";
import { getCelcius, getFarenheit } from './utilities';

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

type RawTemperatureEvent = {
  event: 'temperatureEvent',
  data: string // '9',
  published_at: string // '2023-04-26T02:24:00.652Z',
  coreid: string // 'e00fce687cc15f2e42da5d0a'
}

type ParsedTemperatureEvent = {
  event: 'temperatureEvent',
  data: number // '9',
  publishedAt: Date // '2023-04-26T02:24:00.652Z',
  id: string // 'e00fce687cc15f2e42da5d0a'
}

type ParsedEvent =
  | ParsedTemperatureEvent

type RawEvent =
  | RawTemperatureEvent

const parseEvent = ({ event, data, published_at, coreid }: RawEvent): ParsedEvent | undefined => {
  const parsedPublishedAt = new Date(published_at)
  let parsedData
  switch (event) {
    case 'temperatureEvent': {
      console.log('data', data)
      parsedData = getFarenheit(getCelcius(parseFloat(data))) // This bad, whatevs.
      console.log(parsedData)
      return {
        id: coreid,
        event,
        data: parsedData,
        publishedAt: parsedPublishedAt
      }
    }
    default: {
      console.log("Received unknown event")
    }
  }

}

app.get('/temperature', async (req: express.Request, res: express.Response) => {
  const db = await getClient()
  let collection = await db.collection("temperature");
  const data = await collection.find({}).toArray()
  res.json(data)
})

app.post('/webhook', async (req: express.Request, res: express.Response) => {
  const rawEvent = (req.body as RawEvent)
  console.log(rawEvent)

  const parsedEvent = parseEvent(rawEvent)
  if (parsedEvent === undefined) return

  switch (parsedEvent.event) {
    case 'temperatureEvent': {
      const db = await getClient()
      let collection = await db.collection("temperature");
      collection.insertOne({ publishedAt: parsedEvent.publishedAt, temperature: parsedEvent.data })
      break
    }
    default: {
      console.log("Received unknown event")
    }
  }

  res.send('success')
})

export default app