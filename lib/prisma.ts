/*
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);
console.log("connectionString", connectionString);

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
*/

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

console.log("All environment variables:", process.env);

const connectionString = `${process.env.DATABASE_URL}`;
console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);
console.log("connectionString", connectionString);

const pool = new Pool({ connectionString });

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client?.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Database connection successful, current time:", result.rows[0]);
  });
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;