import express from "express";
import { getLimitedTimeOffer } from "../controllers/limitedTimeOffer.controller.js";

const router = express.Router();

router.get("/", getLimitedTimeOffer);

export default router;
