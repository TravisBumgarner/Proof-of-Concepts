require('dotenv').config()
import http from 'http'

import { Consumer } from 'sqs-consumer'
import express from 'express'
import WebSocket from 'ws'

const expressApp = express()
const server = http.createServer(expressApp)
const wss = new WebSocket.Server({ server })

interface ExtWebSocket extends WebSocket {
  isAlive: boolean
}
wss.on('connection', (ws: WebSocket) => {
  const extWs = ws as ExtWebSocket
  extWs.isAlive = true
  ws.on('pong', () => { extWs.isAlive = true })

  ws.on('message', (message: string) => {
    const parsedMessage = JSON.parse(message)
    wss.clients
      .forEach(client => {
        client.send(JSON.stringify(parsedMessage))
      })
  })

  ws.on('error', (err) => {
    console.warn(`Client disconnected - reason: ${err}`)
  })
})

setInterval(() => {
  wss.clients.forEach((ws: WebSocket) => {

    const extWs = ws as ExtWebSocket

    if (!extWs.isAlive) return ws.terminate()

    extWs.isAlive = false
    ws.ping(null, undefined)
  })
}, 10000)
const port =
  server.listen(process.env.PORT_WEBSOCKET, () => {
    console.log(`Server started on port ${process.env.PORT_WEBSOCKET}`)
  })


const sqsApp = Consumer.create({
  queueUrl: `https://sqs.${process.env.AWS_REGION}.amazonaws.com/820935989716/${process.env.AWS_SQS_QUEUE_NAME}`,
  handleMessage: async (message) => {
    console.log('Message', message.Body)
    console.log('Author', message.MessageAttributes)
    console.log('Title', message.MessageAttributes)
    wss.clients
      .forEach(client => {
        client.send(JSON.stringify({ "user": "Bob", "content": message.Body }))
      })
  },
  attributeNames: ['All'],
  messageAttributeNames: ['All']
});


sqsApp.on('error', (err) => {
  console.error(err.message);
});

sqsApp.on('processing_error', (err) => {
  console.error(err.message);
});

sqsApp.start();