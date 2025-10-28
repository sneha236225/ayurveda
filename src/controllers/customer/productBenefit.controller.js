import ProductBenefits from "../../models/productBenefit.model.js";

// get all Product Benefits
export const getAllProductBenefits = async (req, res) => {
    try {
        const benefits = await ProductBenefits.find()
            .populate("productId", "name category oldPrice newPrice image description inStock")
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Product benefits fetched successfully.",
            data: benefits,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// get Single Product Benefit
export const getSingleProductBenefit = async (req, res) => {
    try {
        const { id } = req.params;
        const benefit = await ProductBenefits.findById(id)
            .populate("productId", "name category oldPrice newPrice image description inStock");

        if (!benefit) {
            return res.status(404).json({
                success: false,
                message: "Product benefit not found.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product benefit fetched successfully.",
            data: benefit,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

