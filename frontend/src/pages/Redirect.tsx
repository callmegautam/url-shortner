import axios from "axios";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const Redirect = () => {
    const { shortUrl } = useParams();
    const didFetch = useRef(false);

    useEffect(() => {
        const redirect = async () => {
            if (didFetch.current) return;
            didFetch.current = true;

            const { data: response } = await axios.get(`http://localhost:8080/url/redirect/${shortUrl}`);
            // console.log(response);
            window.location.href = response.data.originalUrl;
        };

        redirect();
    });

    return (
        <>
            <div className="w-screen h-screen bg-black flex justify-center items-center">
                <h1 className="text-4xl text-white">Redirecting...</h1>
            </div>
        </>
    );
};

export default Redirect;
