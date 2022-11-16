import express, { Request, Response } from 'express';
import isAuthorized from '../middleware/isAuthorized';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();
const index = async (req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};
const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch {
    res.status(500);
    res.json("Something went wrong when fetching user data, maybe the product you're trying to retreive doesn't exist");
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const newProduct: Product = { name: req.body.name, price: parseInt(req.body.price) };
    const createdProduct = await store.create(newProduct);
    res.json(createdProduct);
  } catch {
    res.status(500);
    res.json(
      'Something went wrong when creating a new user make sure that you have specified name,price body parameters'
    );
  }
};

const products_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', isAuthorized, create);
};

export default products_routes;
