import { Router } from "express";
import { urlShortner, redirectUrl } from "@/controllers";
import { asyncHandler } from "@/utils";

const router = Router();

router.post("/short", asyncHandler(urlShortner));
router.get("/redirect/:shortUrlKey", asyncHandler(redirectUrl));

export default router;
