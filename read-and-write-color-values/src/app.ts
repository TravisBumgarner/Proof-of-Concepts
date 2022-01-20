import express from 'express';

const app = express()

app.get('/ok', (req: express.Request, res: express.Response) => {
    res.send('pong!')
})

app.get('/colors', async (req: express.Request, res: express.Response) => {

    res.send('colors')
})

export default app