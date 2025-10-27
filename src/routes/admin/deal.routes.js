import express from "express";
import uploadTo from "../../middlewares/multer.middleware.js";
import { addProductToDeal, createDeal, deleteDeal, getDeal, removeProductFromDeal } from "../../controllers/admin/deal.controller.js";
const upload = uploadTo("deals");
const router = express.Router();

router.post("/create", upload.single("bgImage"), createDeal);
router.get("/", getDeal);
router.delete("/", deleteDeal);
router.put("/add-products", addProductToDeal);
router.put("/remove-products", removeProductFromDeal);

export default router;
