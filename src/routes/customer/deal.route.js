import express from "express";
import { addDeal, getAllDeals } from "../../controllers/customer/deal.controller.js";

const router = express.Router();

router.get("/all", getAllDeals);
router.post("/add", addDeal);

export default router;
