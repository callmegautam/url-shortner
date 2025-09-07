import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import setClipboard from "@/lib/copy-to-clipboard";
import { shortOriginalUrl } from "@/services/url";
import { Copy } from "lucide-react";
import { useState } from "react";

const Home = () => {
    const [shortUrl, setShortUrl] = useState<string>("");
    const [originalWebsiteUrl, setOriginalWebsiteUrl] = useState<string>("");

    const handleShortUrl = async () => {
        try {
            console.log(`Original Website: ${originalWebsiteUrl}`);
            const response = await shortOriginalUrl(originalWebsiteUrl);
            setShortUrl(response.data.data.shortUrl || "Something went wrong");
            console.log(response.data.data.shortUrl);
        } catch (error) {
            console.log(error);
        }
    };

    const handlecCopy = () => {
        setClipboard(shortUrl);
    };

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
