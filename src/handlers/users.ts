import express, {Request, Response} from 'express'
import { User, UserStore } from '../models/user'


const store=new UserStore()
const index=async (req:Request,res:Response) => {
    const users= await store.index()
    res.json(users)
}

const user_routes = (app: express.Application) => {
    app.get('/users', index)
}

export default user_routes