import { defineConfig } from "drizzle-kit";

// `pnpm db:generate` writes SQL migrations to drizzle/ from the module schemas. Wrangler applies them
// (`pnpm db:migrate:local` / `db:migrate:remote`), so drizzle-kit never needs database credentials.
export default defineConfig({
  dialect: "sqlite",
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
});
