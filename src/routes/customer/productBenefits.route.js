import express from "express";
import { getAllProductBenefits, getSingleProductBenefit } from "../../controllers/customer/productBenefit.controller.js";

const router = express.Router();

router.get("/", getAllProductBenefits);
router.get("/:id", getSingleProductBenefit);

export default router;
