import express from "express";
import faqRoutes from "../customer/faq.routes.js";
import categoryRoutes from "../customer/category.routes.js";
import heroRoutes from "../customer/heroSection.route.js";
import limitedOfferRoutes from "../customer/limitedOffer.routes.js";
import dealRoutes from "../customer/deal.route.js";
import productRoutes from "../customer/product.routes.js";
const router = express.Router();

router.use('/hero-section', heroRoutes);
router.use('/category', categoryRoutes);
router.use('/faq', faqRoutes);
router.use('/limited-offer', limitedOfferRoutes);
router.use('/deals', dealRoutes);
router.use('/products', productRoutes);

export default router;
