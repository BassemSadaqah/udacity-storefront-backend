import express, { Request, Response } from 'express';
import isAuthorized from '../middleware/isAuthorized';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch {
    res.status(500);
    res.json('Something went wrong!');
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const newOrder: Order = { user_id: parseInt(req.body.user_id), status: req.body.status };
    console.log(newOrder);
    const createOrder = await store.create(newOrder);
    res.json(createOrder);
  } catch {
    res.status(500);
    res.json(
      'Something went wrong when creating a new user make sure that you have specified user_id,status body parameters'
    );
  }
};

const order_routes = (app: express.Application) => {
  app.get('/orders', index);
  app.post('/orders', isAuthorized, create);
};
export default order_routes;
