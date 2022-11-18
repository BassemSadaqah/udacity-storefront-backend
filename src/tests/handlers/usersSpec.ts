import supertest from 'supertest';
import app from '../../server';
import client from '../../database';
import jwt from 'jsonwebtoken';
const request = supertest(app);
describe('Testing /users route', () => {
  afterAll(async () => {
    const conc = await client.connect();
    await conc.query('DELETE FROM USERS');
    conc.release();
  });
  describe('Testing /users route [Unauthorized user]', () => {
    it('should return unauthorized when trying to access /users', async () => {
      const response = await request.get('/users');
      expect(response.status).toEqual(401);
      expect(response.body).toEqual('Not Authorized');
    });
    it('should return unauthorized when trying to create new user', async () => {
      const response = await request
        .post('/users')
        .send({ firstName: 'Ahmed', lastName: 'Yasser', email: 'ahmedyasser@gmail.com', password: 'myStrongPassword' });
      expect(response.status).toEqual(401);
    });
    it('should return unauthorized for endpoint /users/:id', async () => {
      const response = await request.get('/users/1');
      expect(response.status).toEqual(401);
    });
  });
  describe('Testing /users route [Authorized user]', () => {
    let jwtToken: string;
    beforeAll(() => {
      jwtToken = jwt.sign({ id: 1 }, process.env.JWT_SECRET as string);
    });
    afterAll(async () => {
      const conc = await client.connect();
      conc.query('DELETE FROM users;');
      conc.release();
    });
    it('should create new user', async () => {
      const response = await request
        .post('/users')
        .send({ firstName: 'Ahmed', lastName: 'Yasser', email: 'ahmedyasser@gmail.com', password: 'myStrongPassword' })
        .set('Authorization', 'Bearer ' + jwtToken);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        id: response.body.id,
        firstName: 'Ahmed',
        lastName: 'Yasser',
        email: 'ahmedyasser@gmail.com',
        password: response.body.password,
        token: response.body.token,
      });
    });
    it('should return list of created users /users', async () => {
      const response = await request.get('/users').set('Authorization', 'Bearer ' + jwtToken);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual([
        {
          id: response.body[0].id,
          firstName: 'Ahmed',
          lastName: 'Yasser',
          email: 'ahmedyasser@gmail.com',
          password: response.body[0].password,
        },
      ]);
    });
    it('should return user data for endpoint /users/:id', async () => {
      const createResponse = await request
        .post('/users')
        .send({ firstName: 'Ahmed', lastName: 'Yasser', email: 'ahmedyasser2@gmail.com', password: 'myStrongPassword' })
        .set('Authorization', 'Bearer ' + jwtToken);
      const createdUser = createResponse.body;
      const response = await request.get(`/users/${createdUser.id}`).set('Authorization', 'Bearer ' + jwtToken);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        id: createdUser.id,
        firstName: 'Ahmed',
        lastName: 'Yasser',
        email: 'ahmedyasser2@gmail.com',
        password: response.body.password,
      });
    });
    it('should return jwt token for /login on correct credentials', async () => {
      const response = await request
        .post('/login')
        .send({ email: 'ahmedyasser@gmail.com', password: 'myStrongPassword' });
      expect(response.status).toEqual(200);
      expect(response.body.token).toBeDefined();
    });
    it('should return unauthorized for /login on incorrect credentials', async () => {
      const response = await request.post('/login').send({ email: 'ahmedyasser@gmail.com', password: 'wrongPassword' });
      expect(response.status).toEqual(401);
    });
  });
});
