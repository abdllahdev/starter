import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";

import { serverEnv as env } from "@starter/env/server";

import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  db: NodePgDatabase<typeof schema> | undefined;
};

const db =
  globalForDb.db ??
  drizzle({
    connection: {
      connectionString: env.DATABASE_URL,
      max: 100,
    },
    schema,
  });

if (env.NODE_ENV !== "production") {
  globalForDb.db = db;
}

export { db };

export * from "drizzle-orm";
