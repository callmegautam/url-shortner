import { redirectToOriginalUrl } from "@/services/url";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const Redirect = () => {
    const { shortUrl } = useParams();
    const didFetch = useRef(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const redirect = async () => {
            if (didFetch.current) return;
            didFetch.current = true;

            if (!shortUrl) {
                setIsError(true);
                return;
            }

            const { data: response } = await redirectToOriginalUrl(shortUrl);
            // console.log(response);
            window.location.href = response.data.originalUrl;
        };

        redirect();
    });

    return (
        <>
            <div className="w-screen h-screen bg-black flex justify-center items-center">
                <h1 className="text-4xl text-white">
                    {isError ? "Something went wrong!" : "Redirecting..."}
                </h1>
            </div>
        </>
    );
};

export default Redirect;
