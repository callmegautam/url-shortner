export default function encodeBase62(ID: number): String {
    let shortUrl = "";
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    while (ID > 0) {
        shortUrl = chars[ID % 62] + shortUrl;
        ID = Math.floor(ID / 62);
    }
    return shortUrl || "0";
}
