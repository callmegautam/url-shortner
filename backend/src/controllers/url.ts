import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import db from "@/db";
import { urls } from "@/db/schema";
import env from "@/config/env";
import { websiteSchema } from "@/types/schema";
import { HttpStatus } from "@/types/types";
import { encodeBase62 } from "@/utils";
import { success } from "zod";

export const urlShortner = async (req: Request, res: Response) => {
    const { success, data, error } = websiteSchema.safeParse(req.body);

    if (!success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            success,
            message: "Invalid request data",
            error: error.message,
        });
    }

    const existingUrl = await db.select().from(urls).where(eq(urls.url, data.website));

    if (existingUrl.length > 0) {
        return res.status(HttpStatus.OK).json({
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

    await db
        .update(urls)
        .set({ shortUrl: `${env.FRONTEND_URL}${shortenURL}` })
        .where(eq(urls.id, ID));

    return res.status(HttpStatus.OK).json({
        success: true,
        message: "Short url generated successfully",
        data: {
            longUrl: data.website,
            shortUrl: `${env.FRONTEND_URL}${shortenURL}`,
        },
    });
};

export const redirectUrl = async (req: Request, res: Response) => {
    const { shortUrlKey } = req.params;

    if (!shortUrlKey) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: "parameter is required",
        });
    }

    const shortUrl = `${env.FRONTEND_URL}${shortUrlKey}`;

    const originalUrl = await db.select({ url: urls.url }).from(urls).where(eq(urls.shortUrl, shortUrl));

    if (originalUrl.length <= 0) {
        return res.status(HttpStatus.NOT_FOUND).json({
            success: false,
            message: "Website not found or expired",
        });
    }

    console.log(`Redirect ${shortUrl} to ${originalUrl[0].url}`);

    return res.status(HttpStatus.OK).json({
        success: true,
        message: "Redirecting...",
        data: {
            originalUrl: originalUrl[0].url,
        },
    });
};
