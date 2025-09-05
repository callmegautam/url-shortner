import { z } from "zod";

export enum NodeEnv {
    DEVELOPMENT = "DEVELOPMENT",
    PRODUCTION = "PRODUCTION",
}

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
