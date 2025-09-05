import express, { Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/error-handler";

const app = express();

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
import urlRoute from "./routes";

app.use("/url", urlRoute);

app.use(globalErrorHandler);

export default app;
