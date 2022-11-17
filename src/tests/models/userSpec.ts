import { UserStore } from '../../models/user';
import client from '../../database';
const store = new UserStore();

describe('user Model', () => {
  afterAll(async () => {
    const conc = await client.connect();
    await conc.query('DELETE  FROM users;');
    conc.release();
  });

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('create method should add a user', async () => {
    const result = await store.create({
      firstName: 'John',
      lastName: 'Ritter',
      email: 'johnritter@gmail.com',
      password: 'password',
    });
    expect(result).toEqual({
      id: result.id,
      firstName: 'John',
      lastName: 'Ritter',
      email: 'johnritter@gmail.com',
      password: 'password',
    });
  });
  it('should return all the users in the user table', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: result[0].id,
        firstName: 'John',
        lastName: 'Ritter',
        email: 'johnritter@gmail.com',
        password: 'password',
      },
    ]);
  });
  it('should return user with a specfic id', async () => {
    const newUser = await store.create({
      firstName: 'John',
      lastName: 'Ritter',
      email: 'johnritter3@gmail.com',
      password: 'password',
    });
    const result = await store.show(newUser.id as unknown as string);
    expect(result).toEqual({
      id: result.id,
      firstName: 'John',
      lastName: 'Ritter',
      email: 'johnritter3@gmail.com',
      password: 'password',
    });
  });
});
