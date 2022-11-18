import supertest from 'supertest';
import app from '../../server';
import client from '../../database';
import jwt from 'jsonwebtoken';
const request = supertest(app);

describe('Testing /proudcts route', () => {
  afterAll(async () => {
    const conc = await client.connect();
    await conc.query('DELETE FROM products;');
    await conc.release();
  });
  it('should return unauthorized when trying to create new product [POST /products]', async () => {
    const response = await request.post('/products').send({ name: 'test', price: 50 });
    expect(response.status).toEqual(401);
  });
  it('should create new product for authorized users [POST /products]', async () => {
    const jwtToken = jwt.sign({ id: 1 }, process.env.JWT_SECRET as string);
    const response = await request
      .post('/products')
      .send({ name: 'test', price: 50 })
      .set('Authorization', 'Bearer ' + jwtToken);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ id: response.body.id, name: 'test', price: 50 });
  });
  it('should return a list of all created products [GET /products]', async () => {
    const response = await request.get(`/products/`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([{ id: response.body[0].id, name: 'test', price: 50 }]);
  });
  it('should show product data for a given id [GET /products/:id]', async () => {
    const jwtToken = jwt.sign({ id: 1 }, process.env.JWT_SECRET as string);
    const createResponse = await request
      .post('/products')
      .send({ name: 'new_product', price: 78 })
      .set('Authorization', 'Bearer ' + jwtToken);
    const createdProduct = createResponse.body;
    const response = await request.get(`/products/${createdProduct.id}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ id: createdProduct.id, name: 'new_product', price: 78 });
  });
});
