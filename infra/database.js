import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  await client.connect();
  try {
    const result = await client.query(queryObject);
    return result.rows[0];
  } catch (e) {
    console.error("Error executing query", e);
  } finally {
    await client.end();
  }
}

export default {
  query,
};
