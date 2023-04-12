import { config } from 'dotenv';
import { Pool } from 'pg';
config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
const conn = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: parseInt(DB_PORT),
});

const run = async () => {
  await conn.query(`CREATE EXTENSION unaccent SCHEMA public`);
};
run().catch((error) => console.log(error));
