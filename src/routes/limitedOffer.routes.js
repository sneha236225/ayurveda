import express from "express";
import {createLimitedTimeOffer, getLimitedTimeOffers, getLimitedTimeOfferById, updateLimitedTimeOffer, deleteLimitedTimeOffer} from "../controllers/limitedTimeOffer.controller.js";

const router = express.Router();

router.post("/", createLimitedTimeOffer);
router.get("/", getLimitedTimeOffers);
router.get("/:id", getLimitedTimeOfferById);
router.put("/:id", updateLimitedTimeOffer);
router.delete("/:id", deleteLimitedTimeOffer);

export default router;
