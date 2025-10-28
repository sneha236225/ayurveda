import express from "express";
import productRoutes from "../admin/product.routes.js";
import LimitedTimeOfferRoutes from "../admin/limitedOffer.routes.js";
import dealRoutes from "../admin/deal.routes.js";
import productBenefitRoutes from "../admin/productBenefit.routes.js";
const router = express.Router();

router.use('/product', productRoutes);
router.use('/limited-offer', LimitedTimeOfferRoutes);
router.use('/deal', dealRoutes);
router.use('/product-benefit', productBenefitRoutes);

export default router;
