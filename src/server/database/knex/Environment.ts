import { Knex } from "knex";
import path from "path";

export const development: Knex.Config = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, "..", "..", "..", "..", "db.sqlite3"),
  },
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
  pool: {
    afterCreate: (conn: any, done: Function) => {
      conn.run("PRAGMA foreign_keys = ON");
      done();
    },
  },
};

export const test: Knex.Config = {
  ...development,
  connection: ":memory:",
};

export const production: Knex.Config = {
  ...development,
};
