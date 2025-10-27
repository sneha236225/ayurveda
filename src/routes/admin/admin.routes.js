import express from "express";
import productRoutes from "../admin/product.routes.js";
import LimitedTimeOfferRoutes from "../admin/limitedOffer.routes.js";
const router = express.Router();

router.use('/product', productRoutes);
router.use('/limited-offer', LimitedTimeOfferRoutes);

export default router;
