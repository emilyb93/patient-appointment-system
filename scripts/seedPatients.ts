import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import { patients } from "@lutra/server/db/schema";
import { env } from "@lutra/env";

async function main() {
  const db = drizzle(env.DATABASE_URL!);

  await seed(db, { patients }).refine((f) => ({
    patients: {
      columns: {
        firstName: f.firstName(),
        lastName: f.lastName(),
        dateOfBirth: f.date(),
        email: f.email(),
        isActive: f.boolean(),
      },
      count: 10,
    },
  }));
}

main();
