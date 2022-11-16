//@ts-ignore
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PWD, DATABASE_NAME_TEST, ENV } = process.env;

let client: Pool;
if (ENV == 'test') {
  client = new Pool({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PWD,
    database: DATABASE_NAME_TEST,
  });
} else {
  client = new Pool({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PWD,
    database: DATABASE_NAME,
  });
}

export default client;
