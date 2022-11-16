import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import user_routes from './handlers/users';
import product_routes from './handlers/products';
const app = express();
dotenv.config();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response): void => {
  res.send('hello world!');
});
user_routes(app)
product_routes(app)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
