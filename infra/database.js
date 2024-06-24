import { Client } from "pg";

async function query(queryObject) {
  const sslConfig =
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false;

  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: sslConfig,
  });

  console.log({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: sslConfig,
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result.rows[0];
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await client.end();
  }
}

export default {
  query,
};
