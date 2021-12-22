"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
    const extWs = ws;
    extWs.isAlive = true;
    ws.on('pong', () => { extWs.isAlive = true; });
    ws.on('message', (msg) => {
        const action = JSON.parse(msg);
        wss.clients
            .forEach(client => {
            client.send(msg);
        });
    });
    ws.on('error', (err) => {
        console.warn(`Client disconnected - reason: ${err}`);
    });
});
setInterval(() => {
    wss.clients.forEach((ws) => {
        const extWs = ws;
        if (!extWs.isAlive)
            return ws.terminate();
        extWs.isAlive = false;
        ws.ping(null, undefined);
    });
}, 10000);
//start our server
server.listen(5000, () => {
    console.log(`Server started on port 5000`);
});
//# sourceMappingURL=server.js.map