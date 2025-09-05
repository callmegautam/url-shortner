import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

const db = drizzle(process.env.DB_URL!);

export default db;
