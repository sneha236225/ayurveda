import Product from "../../models/product.model.js";

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Products fetched successfully.",
            data: products
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get single product
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(404).json({ success: false, message: "Product not found." });
        res.status(200).json({
            success: true,
            message: "Product fetched successfully.",
            data: product
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};