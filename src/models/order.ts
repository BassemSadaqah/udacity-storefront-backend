import client from '../database';
export type Order = {
  id: Number;
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
}
