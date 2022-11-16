import { Console } from 'console';
import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isAuthorized from '../middleware/isAuthorized';

const store = new UserStore();
const pepper = process.env.BCRYPT_PWD as string;
const jwtSecret = process.env.JWT_SECRET as string;
const saltRounds = process.env.SALT_ROUNDS as string;
const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.json('Something went wrong when fetching users data');
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch {
    res.status(500);
    res.json("Something went wrong when fetching user data, maybe the user you're trying to retreive doesn't exist");
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const newUser: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    const hashedPwd = bcrypt.hashSync(newUser.password + pepper, parseInt(saltRounds));
    const createdUser = await store.create({ ...newUser, password: hashedPwd });
    const jwtToken = jwt.sign({ user_id: createdUser.id }, jwtSecret);
    res.json({ ...createdUser, token: jwtToken });
  } catch {
    res.status(500);
    res.json(
      'Something went wrong when creating a new user make sure that you have specified firstName,lastName,email,password body parameters'
    );
  }
};
const login = async (req: Request, res: Response) => {
  try {
    const user_email = req.body.email as string;
    const user_password = req.body.password as string;
    const user_data = await store.showByEmail(user_email);
    if (bcrypt.compareSync(user_password + pepper, user_data.password)) {
      const jwtToken = jwt.sign({ user_id: user_data.id }, jwtSecret);
      res.json({ token: jwtToken });
    } else {
      res.json('Email or password is incorrect');
    }
  } catch {
    res.json('Email or password is incorrect');
  }
};
const user_routes = (app: express.Application) => {
  app.get('/users', isAuthorized, index);
  app.get('/users/:id', isAuthorized, show);
  app.post('/users', isAuthorized, create);
  app.post('/login', login);
};

export default user_routes;
