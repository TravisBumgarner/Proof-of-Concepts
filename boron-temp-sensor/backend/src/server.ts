// src/server.ts
import express, { Request, Response } from 'express';
import expressWs from 'express-ws';
import fs from 'fs';
import cors from 'cors'; 


const app = express();
const port = 5005;

app.use(cors());


expressWs(app);
app.use(express.json());

app.post('/data', (req: Request, res: Response) => {
  const { body} = req;
  console.log('message received', body)
  fs.appendFile('data.txt', JSON.stringify(body) + '\n', (err: any) => {
    if (err) {
      console.error(err);
    }
  });
  res.sendStatus(200);
});

// Create an endpoint to retrieve all data
app.get('/temps', (req, res) => {
  // Read data from the text file and send it as a response
  const dataStream = fs.createReadStream('data.txt');
  dataStream.pipe(res);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
