import express from "express";
import { getDeal } from "../../controllers/customer/deal.controller.js";

const router = express.Router();

router.get("/all", getDeal);

export default router;
