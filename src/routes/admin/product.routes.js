import express from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../../controllers/admin/product.controller.js";
import uploadTo from "../../middlewares/multer.middleware.js";

const router = express.Router();
const productUpload = uploadTo("products");

router.post("/add", productUpload.single("image"), addProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/update/:id", productUpload.single("image"), updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
