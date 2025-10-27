import express from "express";
import faqRoutes from "../routes/faq.routes.js";
import categoryRoutes from "../routes/category.routes.js";
import heroRoutes from "../routes/heroSection.route.js";
import limitedOfferRoutes from "../routes/limitedOffer.routes.js";
const router = express.Router();

router.use('/hero-section', heroRoutes);
router.use('/category', categoryRoutes);
router.use('/faq', faqRoutes);
router.use('/limited-offer', limitedOfferRoutes);

export default router;
