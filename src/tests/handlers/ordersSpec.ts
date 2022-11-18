import supertest from 'supertest';
import app from '../../server';
import client from '../../database';
import jwt from 'jsonwebtoken';
const request = supertest(app);

describe('Testing orders handler', () => {
  afterAll(async () => {
    const conc = await client.connect();
    await conc.query('DELETE FROM order_products;');
    await conc.query('DELETE FROM orders;');
    await conc.query('DELETE FROM products;');
    await conc.query('DELETE FROM users;');
    conc.release();
  });
  it('should return unauthorized when trying to get certain users order [GET /users/:id/orders] [No-Token]', async () => {
    const response = await request.get('/users/1/orders');
    expect(response.status).toEqual(401);
  });
  it('should create a new order [POST /orders]', async () => {
    //create new user
    const jwtToken = jwt.sign({ id: 1 }, process.env.JWT_SECRET as string);
    const createUserResponse = await request
      .post('/users')
      .send({ firstName: 'Ahmed', lastName: 'Yasser', email: 'ahmedyasser@gmail.com', password: 'myStrongPassword' })
      .set('Authorization', 'Bearer ' + jwtToken);
    const createdUser = createUserResponse.body;
    //create new product
    const response = await request
      .post('/orders')
      .send({ user_id: createdUser.id, status: 'active' })
      .set('Authorization', 'Bearer ' + jwtToken);
    expect(response.body).toEqual({ id: response.body.id, user_id: createdUser.id, status: 'active' });
  });
  it('should add products for a certain order [POST orders/:id/products]', async () => {
    const jwtToken = jwt.sign({ id: 1 }, process.env.JWT_SECRET as string);
    //create new user
    const createUserResponse = await request
      .post('/users')
      .send({ firstName: 'Ahmed', lastName: 'Yasser', email: 'ahmedyasser457@gmail.com', password: 'myStrongPassword' })
      .set('Authorization', 'Bearer ' + jwtToken);
    const createdUser = createUserResponse.body;
    //create new product
    const createProductResponse = await request
      .post('/products')
      .send({ name: 'test', price: 50 })
      .set('Authorization', 'Bearer ' + jwtToken);
    const createdProduct = createProductResponse.body;
    //create new order
    const createOrderResponse = await request
      .post('/orders')
      .send({ user_id: createdUser.id, status: 'active' })
      .set('Authorization', 'Bearer ' + jwtToken);
    const createdOrder = createOrderResponse.body;
    //Add order products
    const createOrderProductResponse = await request
      .post(`/orders/${createdOrder.id}/products`)
      .send({ order_id: createdOrder.id, product_id: createdProduct.id, quantity: 5 })
      .set('Authorization', 'Bearer ' + jwtToken);
    const createdOrderProduct = createOrderProductResponse.body;
    expect(createOrderProductResponse.status).toEqual(200);
    expect(createdOrderProduct).toEqual({
      id: createdOrderProduct.id,
      order_id: createdOrder.id,
      product_id: createdProduct.id,
      quantity: 5,
    });
  });
  it('should return a list of user orders for a specifc user id [GET /users/:id/orders]', async () => {
    const jwtToken = jwt.sign({ id: 1 }, process.env.JWT_SECRET as string);
    //create new user
    const createUserResponse = await request
      .post('/users')
      .send({ firstName: 'Ahmed', lastName: 'Yasser', email: 'ahmedyasser2@gmail.com', password: 'myStrongPassword' })
      .set('Authorization', 'Bearer ' + jwtToken);
    const createdUser = createUserResponse.body;
    //create new product
    const createProductResponse = await request
      .post('/products')
      .send({ name: 'test', price: 50 })
      .set('Authorization', 'Bearer ' + jwtToken);
    const createdProduct = createProductResponse.body;
    //create new order
    const createOrderResponse = await request
      .post('/orders')
      .send({ user_id: createdUser.id, status: 'active' })
      .set('Authorization', 'Bearer ' + jwtToken);
    const createdOrder = createOrderResponse.body;
    //Add order products
    const createOrderProductResponse = await request
      .post(`/orders/${createdOrder.id}/products`)
      .send({ order_id: createdOrder.id, product_id: createdProduct.id, quantity: 5 })
      .set('Authorization', 'Bearer ' + jwtToken);
    const createdOrderProduct = createOrderProductResponse.body;
    //Get user order products
    const response = await request.get(`/users/${createdUser.id}/orders`).set('Authorization', 'Bearer ' + jwtToken);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([
      {
        id: createdOrderProduct.id,
        status: 'active',
        user_id: createdUser.id,
        quantity: 5,
        order_id: createdOrder.id,
        product_id: createdProduct.id,
      },
    ]);
  });
});
