import { Router } from "express";
import { urlShortner } from "@/controllers";
import asyncHandler from "@/utils/async-handler";

const router = Router();

router.post("/shorten", asyncHandler(urlShortner));

export default router;
