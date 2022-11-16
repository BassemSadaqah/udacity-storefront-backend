import { Request, Response } from 'express';
import { request } from 'http';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

const isAuthorized = (req: Request, res: Response, next: Function): void => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const jwtDecoded = jwt.verify(token, jwtSecret);
    next();
  } catch {
    res.status(401);
    res.json('Not Authorized');
  }
};

export default isAuthorized;
