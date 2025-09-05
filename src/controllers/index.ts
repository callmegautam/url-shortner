import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import db from "@/db";
import { urls } from "@/db/schema";
import env from "@/config/env";
import { websiteSchema } from "@/types/schema";
import encodeBase62 from "@/utils/encode-base-62";

export const urlShortner = async (req: Request, res: Response) => {
    const { success, data, error } = websiteSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            success,
            message: "Invalid request data",
            error: error.message,
        });
    }

    const existingUrl = await db.select().from(urls).where(eq(urls.url, data.website));

    if (existingUrl.length > 0) {
        console.log("website already exist");
        return res.status(200).json({
            success: true,
            message: "url already exists",
            data: {
                longUrl: data.website,
                shortUrl: existingUrl[0].shortUrl,
            },
        });
    }

    const shortUrlID = await db.insert(urls).values({ url: data.website }).returning();

    const ID = shortUrlID[0].id;

    const shortenURL = encodeBase62(ID);

    const shortWebsite = await db
        .update(urls)
        .set({ shortUrl: `${env.FRONTEND_URL}${shortenURL}` })
        .returning();

    console.log(shortWebsite[0]);

    return res.status(200).json({
        success: true,
        data: {
            longUrl: data.website,
            shortUrl: `${env.FRONTEND_URL}${shortenURL}`,
        },
    });
};
