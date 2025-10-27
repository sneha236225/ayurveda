import express from "express";
import uploadTo from "../../middlewares/multer.middleware.js";
import { createLimitedTimeOffer, deleteLimitedTimeOffer, getLimitedTimeOffer, updateLimitedTimeOffer } from "../../controllers/admin/limitedTimeOffer.controller.js";
const offerUpload = uploadTo("limited-offers");

const router = express.Router();

router.post("/create", offerUpload.single("bgImage"), createLimitedTimeOffer);
router.get("/", getLimitedTimeOffer);
router.put("/:id", offerUpload.single("bgImage"), updateLimitedTimeOffer);
router.delete("/:id", deleteLimitedTimeOffer);

export default router;
