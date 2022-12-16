import client from '../database';
export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conc = await client.connect();
      const sql_query = 'SELECT * FROM products';
      const result = await conc.query(sql_query);
      conc.release();
      return result.rows;
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }
  async show(id: string): Promise<Product> {
    try {
      const conc = await client.connect();
      const sql_query = 'SELECT * FROM products where id=$1';
      const result = await conc.query(sql_query, [id]);
      conc.release();
      if (result.rows.length) {
        return result.rows[0];
      } else {
        throw new Error(`Could not find product ${id}.`);
      }
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }
  async create(product: Product): Promise<Product> {
    try {
      const conc = await client.connect();
      const sql_query = 'INSERT into products (name,price) VALUES($1,$2) RETURNING *';
      const result = await conc.query(sql_query, [product.name, product.price]);
      conc.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }
}
