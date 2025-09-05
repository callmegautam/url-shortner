import { Request, Response } from "express";
import { shortSchema } from "../utils/schema";
import encodeBase62 from "../utils/encodeBase62";
import db from "@/db";
import { urls } from "@/db/schema";
import { eq } from "drizzle-orm";
import config from "@/config/config";

export const shortController = async (req: Request, res: Response) => {
    try {
        const { success, data, error } = shortSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                success,
                message: "Invalid request data",
                error: error.message,
            });
        }

        const existingUrl = await db.select().from(urls).where(eq(urls.url, data.website)).execute();

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

        console.log(`shorten url : ${shortenURL}`);

        const shortWebsite = await db
            .update(urls)
            .set({ shortUrl: `${config.frontendUrl}${shortenURL}` })
            .returning();

        console.log(shortWebsite[0]);

        return res.status(200).json({
            success: true,
            data: {
                longUrl: data.website,
                shortUrl: `${config.frontendUrl}${shortenURL}`,
            },
        });
    } catch (error) {
        throw new Error("Error: ");
    }
};
