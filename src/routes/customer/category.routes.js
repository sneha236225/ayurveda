import express from "express";
import {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "../../controllers/customer/category.controller.js";

const router = express.Router();

router.post("/add", addCategory);
router.get("/all", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;
