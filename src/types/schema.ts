import { z } from "zod";

export const shortSchema = z.object({
    website: z.url(),
});
