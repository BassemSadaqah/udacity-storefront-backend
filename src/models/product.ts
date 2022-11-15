import client from "../database";
export type Product ={
    id: Number,
    name: String,
    price: Number,
}

export class ProductStore{
    async index():Promise<Product[]>{
        try{
            const conc= await client.connect()
            const sql_query='SELECT * FROM products'
            const result=await conc.query(sql_query)
            conc.release()
            return result.rows
        }catch(err){
            throw new Error('Something went wrong')
        }
    }
}