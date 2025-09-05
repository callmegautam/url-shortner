import { Router } from "express";
import { shortController } from "../controllers/index.controller";

const router = Router();

router.post("/shorten", shortController);

export default router;
