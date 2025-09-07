import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Home = () => {
    return (
        <div className="flex justify-center bg-black flex-col  items-center w-screen h-screen text-white gap-4">
            <h1 className="text-4xl">Url Shortner</h1>
            <div className="flex w-full max-w-sm items-center gap-2">
                <div className="flex w-full max-w-sm items-center gap-2">
                    <Input type="text" placeholder="Website Url" />
                    <Button type="submit" variant="outline">
                        Short
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
