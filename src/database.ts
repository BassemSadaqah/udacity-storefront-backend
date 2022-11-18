//@ts-ignore
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USER, DATABASE_PWD, DATABASE_NAME_TEST, ENV } =
  process.env;
let client: Pool;
if (ENV == 'test') {
  client = new Pool({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PWD,
    database: DATABASE_NAME_TEST,
    port: parseInt(DATABASE_PORT as string),
  });
} else {
  client = new Pool({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PWD,
    database: DATABASE_NAME,
    port: parseInt(DATABASE_PORT as string),
  });
}

export default client;
