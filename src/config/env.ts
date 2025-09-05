import { NodeEnv } from "@/types/types";
import { z } from "zod";

const env = z.object({
    NODE_ENV: z.enum(NodeEnv),
    PORT: z.coerce.number(),
    FRONTEND_URL: z.string(),
    DB_URL: z.string(),
    BACKEND_URL: z.string(),
    // JWT_SECRET: z.string(),
    // JWT_EXPIRY: z.string(),
});

export default env.parse(process.env);
