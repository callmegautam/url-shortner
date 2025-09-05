import { z } from "zod";

export const websiteSchema = z.object({
    website: z.url(),
});
