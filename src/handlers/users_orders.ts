import express, { Request, Response } from 'express';
import isAuthorized from '../middleware/isAuthorized';
import { UserOrders, userOrdersStore } from '../models/user_orders';

const store = new userOrdersStore();

const showUserOrders = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.id;
    const user_orders = await store.show(user_id);
    res.json(user_orders);
  } catch {
    res.status(500);
    res.json('Something went wrong!');
  }
};

const user_orders_routes = (app: express.Application) => {
  app.get('/users/:id/orders',isAuthorized, showUserOrders);
};
export default user_orders_routes;
