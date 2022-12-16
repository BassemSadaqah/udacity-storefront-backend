import { ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';
import client from '../../database';
const productStore = new ProductStore();
const userStore = new UserStore();
describe('Product Model', () => {
  let newUser: User;
  afterAll(async () => {
    const conc = await client.connect();
    await conc.query('DELETE  FROM products;');
    conc.release();
  });
  it('should have an index method', () => {
    expect(productStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(productStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(productStore.create).toBeDefined();
  });
  it('create method should add a new product', async () => {
    const result = await productStore.create({
      name: 'test',
      price: 50,
    });
    expect(result).toEqual({
      id: result.id,
      name: 'test',
      price: 50,
    });
  });
  it('should return all the products in the product table', async () => {
    const result = await productStore.index();
    expect(result).toEqual([
      {
        id: result[0].id as number,
        name: 'test',
        price: 50,
      },
    ]);
  });
});
