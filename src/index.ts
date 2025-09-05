import app from "@/app";
import env from "@/config/env";

app.listen(env.PORT || 8080, () => {
    console.log(`Server is listening on ${env.BACKEND_URL}`);
});

app.on("error", (err: any) => {
    console.error(`Error occured: ${err.message}`);
});
