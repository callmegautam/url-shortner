import API from "@/lib/axios";

export const shortOriginalUrl = (originalUrl: string) => API.post("/url/short", { website: originalUrl });
export const redirectToOriginalUrl = (shortUrl: string) => API.get(`/url/redirect/${shortUrl}`);
