import { OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';
import client from '../../database';
const orderStore = new OrderStore();
const userStore = new UserStore();
describe('Order Model', () => {
  let newUser: User;
  beforeAll(async () => {
    newUser = await userStore.create({
      firstName: 'John',
      lastName: 'Ritter',
      email: 'orderspec@gmail.com',
      password: 'password',
    });
  });
  afterAll(async () => {
    const conc = await client.connect();
    await conc.query('DELETE  FROM orders;');
    await conc.query('DELETE  FROM users;');
    conc.release();
  });
  it('should have an index method', () => {
    expect(orderStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(orderStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderStore.create).toBeDefined();
  });
  it('create method should add a new order', async () => {
    const result = await orderStore.create({
      user_id: newUser.id as Number,
      status: 'active',
    });
    expect(result).toEqual({
      id: result.id,
      user_id: newUser.id as Number,
      status: 'active',
    });
  });
  it('should return all the orders in the order table', async () => {
    const result = await orderStore.index();
    expect(result).toEqual([
      {
        id: result[0].id as Number,
        user_id: newUser.id as Number,
        status: 'active',
      },
    ]);
  });
});
