import express from "express";
import { createProductBenefit, deleteProductBenefit, getAllProductBenefits, getSingleProductBenefit, updateProductBenefit } from "../../controllers/admin/productBenefit.controller.js";

const router = express.Router();

router.post("/create", createProductBenefit);
router.get("/", getAllProductBenefits);
router.get("/:id", getSingleProductBenefit);
router.put("/:id", updateProductBenefit);
router.delete("/:id", deleteProductBenefit);

export default router;
