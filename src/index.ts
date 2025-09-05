import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import urlRoute from "./routes/index.routes";

app.use("/", urlRoute);

app.listen(8080, () => {
    console.log("Server is listening on http://localhost:8080");
});
