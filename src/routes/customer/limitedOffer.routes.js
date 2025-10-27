import express from "express";
import { getLimitedTimeOffer } from "../../controllers/customer/limitedTimeOffer.controller.js";

const router = express.Router();

router.get("/get", getLimitedTimeOffer);

export default router;
