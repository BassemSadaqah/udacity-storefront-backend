import client from "../database";
export type User ={
    id?: Number,
    fistName: String,
    lastName: String,
    password: String
}

export class UserStore{
    async index():Promise<User[]>{
        try{
            const conc= await client.connect()
            const sql_query='SELECT * FROM users'
            const result=await conc.query(sql_query)
            conc.release()
            return result.rows
        }catch(err){
            throw new Error('Something went wrong')
        }
    }
   async show(id:Number):Promise<User>{
    try{
        const conc= await client.connect()
        const sql_query='SELECT * FROM users where id=$1'
        const result=await conc.query(sql_query,[id])
        conc.release()
        if(result.rows.length){
            return result.rows[0]
        }else{
            throw new Error(`Could not find user ${id}.`)
        }
    }catch(err){
        throw new Error('Something went wrong')
    }
   }
   async create(user:User):Promise<User>{
    try{
        const conc= await client.connect()
        const sql_query='INSERT into users (firstName,lastName,password) VALUES($1,$2,$3) RETURNING *'
        const result=await conc.query(sql_query,[user.fistName,user.lastName,user.password])
        conc.release()
        return result.rows[0]
    }catch(err){
        throw new Error('Something went wrong')
    }
   }
}