import express from "express";
import customerRoutes from "./customer/customer.routes.js";
import adminRoutes from "./admin/admin.routes.js";
const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/customer', customerRoutes);

export default router;
