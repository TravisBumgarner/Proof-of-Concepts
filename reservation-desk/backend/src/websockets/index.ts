require('dotenv').config()

import http from 'http'

import express from 'express'
import WebSocket from 'ws'

const app = express()
const server = http.createServer(app)
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