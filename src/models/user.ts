import client from '../database';
export type User = {
  id?: Number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conc = await client.connect();
      const sql_query = 'SELECT * FROM users';
      const result = await conc.query(sql_query);
      conc.release();
      return result.rows;
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }
  async show(id: string): Promise<User> {
    try {
      const conc = await client.connect();
      const sql_query = 'SELECT * FROM users where id=$1';
      const result = await conc.query(sql_query, [id]);
      conc.release();
      if (result.rows.length) {
        return result.rows[0];
      } else {
        throw new Error(`Could not find user ${id}.`);
      }
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }
  async showByEmail(email: string): Promise<User> {
    try {
      const conc = await client.connect();
      const sql_query = 'SELECT * FROM users where email=$1';
      const result = await conc.query(sql_query, [email]);
      conc.release();
      if (result.rows.length) {
        return result.rows[0];
      } else {
        throw new Error(`Could not find user ${email}.`);
      }
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }
  async create(user: User): Promise<User> {
    try {
      const conc = await client.connect();
      const sql_query = 'INSERT into users ("firstName","lastName","email","password") VALUES($1,$2,$3,$4) RETURNING *';
      const result = await conc.query(sql_query, [user.firstName, user.lastName, user.email, user.password]);
      conc.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }
}
