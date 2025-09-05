import { Router } from "express";
import { shortController } from "../controllers";

const router = Router();

router.post("/shorten", shortController);

export default router;
