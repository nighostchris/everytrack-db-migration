import "dotenv/config";
import { Knex } from "knex";

const DATABASE_URL = process.env.DATABASE_URL;

const config: Knex.Config = {
  client: "pg",
  connection: DATABASE_URL,
  seeds: {
    extension: "ts",
    directory: "./seeds",
  },
};

export default config;
