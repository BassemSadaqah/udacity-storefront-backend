import client from '../database';
export type UserOrders = {
  id: Number;
  user_id: Number;
  status:string;
  quantity: Number;
  order_id: Number;
  product_id: Number;
};
export class userOrdersStore {
  async show(id: string): Promise<UserOrders[]> {
    try {
      const conc = await client.connect();
      const sql_query =
        'SELECT * FROM orders INNER JOIN order_products on orders.id=order_products.order_id where orders.user_id=$1';
      const result = await conc.query(sql_query, [id]);
      conc.release();
      return result.rows;
    } catch(err) {
        console.log(err)
      throw new Error('Something went wrong');
    }
  }
}
