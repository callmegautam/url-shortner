import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

const timestamps = {
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
};

export const urls = pgTable("urls", {
    id: serial("id").primaryKey(),
    url: text("url").notNull(),
    shortUrl: text("short_url"),
    ...timestamps,
});
