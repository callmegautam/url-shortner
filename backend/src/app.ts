import express, { Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "@/middlewares/error-handler";
import env from "@/config/env";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
import urlRoute from "@/routes";
app.use("/api/url", urlRoute);

// error handler
app.use(globalErrorHandler);

export default app;
