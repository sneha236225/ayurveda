import express from "express";
import {
    getHeroSectionData,
} from "../../controllers/customer/heroSection.controller.js";

const router = express.Router();

router.get("/data", getHeroSectionData);

export default router;
