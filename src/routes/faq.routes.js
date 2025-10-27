import express from "express";
import {
    addFaq,
    getAllFaq,
    getFaqById,
    updateFaq,
    deleteFaq
} from "../controllers/faq.controller.js";

const router = express.Router();

router.post("/add", addFaq);
router.get("/all", getAllFaq);
router.get("/:id", getFaqById);
router.put("/update/:id", updateFaq);
router.delete("/delete/:id", deleteFaq);

export default router;
