import client from '../database';
export type OrderProduct = {
  id?: Number;
  order_id: Number;
  product_id: Number;
  quantity: Number;
};

export class OrderProductsStore {
  async index(): Promise<OrderProduct[]> {
    try {
      const conc = await client.connect();
      const sql_query = 'SELECT * FROM order_products';
      const result = await conc.query(sql_query);
      conc.release();
      return result.rows;
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }
  async show(id: string): Promise<OrderProduct> {
    try {
      const conc = await client.connect();
      const sql_query = 'SELECT * FROM order_products where order_id=$1';
      const result = await conc.query(sql_query, [id]);
      conc.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }
  async create(OrderProduct: OrderProduct): Promise<OrderProduct> {
    try {
      const conc = await client.connect();
      const sql_query = 'INSERT into order_products (order_id,product_id,quantity) VALUES($1,$2,$3) RETURNING *';
      const result = await conc.query(sql_query, [
        OrderProduct.order_id,
        OrderProduct.product_id,
        OrderProduct.quantity,
      ]);
      conc.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }
}
