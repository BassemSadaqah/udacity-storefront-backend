import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import user_routes from './handlers/users';
import order_routes from './handlers/orders';
import product_routes from './handlers/products';
import user_orders_routes from './handlers/users_orders';
import orders_products_routes from './handlers/orders_products';
const app = express();
const port = process.env.PORT;
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response): void => {
  res.send('hello world!');
});

user_routes(app);
product_routes(app);
order_routes(app);
user_orders_routes(app);
orders_products_routes(app);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;
