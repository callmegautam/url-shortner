import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Copy } from "lucide-react";
import { useState } from "react";

const Home = () => {
    const [shortUrl, setShortUrl] = useState<string>("");
    const [originalWebsiteUrl, setOriginalWebsiteUrl] = useState<string>("");

    const handleShortUrl = async () => {
        const data = {
            website: originalWebsiteUrl,
        };
        const response = await axios.post("http://localhost:8080/url/short", data);
        setShortUrl(response.data.data.shortUrl || "Something went wrong");
        console.log(response.data.data.shortUrl);
    };

    const handlecCopy = () => {
        setClipboard(shortUrl);
    };

    async function setClipboard(text: string) {
        const type = "text/plain";
        const clipboardItemData = {
            [type]: text,
        };
        const clipboardItem = new ClipboardItem(clipboardItemData);
        await navigator.clipboard.write([clipboardItem]);
    }

    return (
        <div className="flex justify-center bg-black flex-col  items-center w-screen h-screen text-white gap-4">
            <h1 className="text-4xl">Url Shortner [under dev]</h1>
            <div className="flex w-full max-w-sm items-center gap-2">
                <div className="flex w-full max-w-sm items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Website Url"
                        value={originalWebsiteUrl}
                        onChange={(e) => setOriginalWebsiteUrl(e.target.value)}
                    />
                    <Button type="submit" variant="outline" onClick={handleShortUrl}>
                        Short
                    </Button>
                </div>
            </div>
            <div className="flex w-full max-w-sm items-center gap-2">
                <div className="flex w-full max-w-sm items-center gap-2">
                    <Input type="text" disabled placeholder="Your short link" value={shortUrl} />

                    <Button type="submit" variant="outline" onClick={handlecCopy}>
                        <Copy />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
