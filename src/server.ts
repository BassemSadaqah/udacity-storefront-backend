import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response): void => {
  res.send('hello world!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
