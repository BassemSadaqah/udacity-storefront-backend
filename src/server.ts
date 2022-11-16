import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import user_routes from './handlers/users';
import product_routes from './handlers/products';
const app = express();
const port = process.env.PORT;
dotenv.config();
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response): void => {
  res.send('hello world!');
});
user_routes(app);
product_routes(app);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
