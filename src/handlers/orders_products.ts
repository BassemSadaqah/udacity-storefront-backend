import express, { Request, Response } from 'express';
import { OrderProduct, OrderProductsStore } from '../models/order_products';

const store = new OrderProductsStore();

const index = async (req: Request, res: Response) => {
  try {
    const ordersProducts = await store.index();
    res.json(ordersProducts);
  } catch {
    res.status(500);
    res.json('Something went wrong!');
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const order_id = req.params.order_id;
    const ordersProducts = await store.show(order_id);
    res.json(ordersProducts);
  } catch {
    res.status(500);
    res.json('Something went wrong!');
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const newOrderProduct: OrderProduct = {
      product_id: parseInt(req.body.product_id),
      order_id: parseInt(req.params.order_id),
      quantity: parseInt(req.body.quantity),
    };
    const createOrderProduct = await store.create(newOrderProduct);
    res.json(createOrderProduct);
  } catch {
    res.status(500);
    res.json(
      'Something went wrong when creating a new user make sure that you have specified product_id,quantity body parameters'
    );
  }
};

const orders_products_routes = (app: express.Application) => {
  app.get('/orders/products', index);
  app.get('/orders/:order_id/products', show);
  app.post('/orders/:order_id/products', create);
};
export default orders_products_routes;
