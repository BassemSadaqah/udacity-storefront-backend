import client from '../database';
export type Order = {
  id?: Number;
  user_id: Number;
  status: String;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conc = await client.connect();
      const sql_query = 'SELECT * FROM orders';
      const result = await conc.query(sql_query);
      conc.release();
      return result.rows;
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const conc = await client.connect();
      const sql_query = 'SELECT * FROM order where id=$1';
      const result = await conc.query(sql_query, [id]);
      conc.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }
  async create(order: Order): Promise<Order> {
    try {
      const conc = await client.connect();
      const sql_query = 'INSERT into orders (user_id,status) VALUES($1,$2) RETURNING *';
      const result = await conc.query(sql_query, [order.user_id, order.status]);
      conc.release();
      return result.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error('Something went wrong');
    }
  }
}
