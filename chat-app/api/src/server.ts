import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

const app = express()

//initialize a simple http server
const server = http.createServer(app)

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server })

interface ExtWebSocket extends WebSocket {
    isAlive: boolean
}

wss.on('connection', (ws: WebSocket) => {
    const extWs = ws as ExtWebSocket
    extWs.isAlive = true
    ws.on('pong', () => { extWs.isAlive = true })

    ws.on('message', (msg: string) => {
        const action = JSON.parse(msg)

        wss.clients
        .forEach(client => {
            client.send(msg)
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

//start our server
server.listen(5000, () => {
    console.log(`Server started on port 5000`)
})