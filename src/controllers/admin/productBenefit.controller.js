import ProductBenefits from "../../models/productBenefit.model.js";

// create Product Benefit
export const createProductBenefit = async (req, res) => {
    try {
        const { productId, features } = req.body;
        if (!productId || !features) {
            return res.status(400).json({
                success: false,
                message: "Product ID and features are required.",
            });
        }
        const parsedFeatures = typeof features === "string" ? JSON.parse(features) : features;
        if (parsedFeatures.length < 4 || parsedFeatures.length > 6) {
            return res.status(400).json({
                success: false,
                message: "Features must be between 4 and 6 items.",
            });
        }
        const newBenefit = await ProductBenefits.create({
            productId,
            features: parsedFeatures,
        });
        res.status(201).json({
            success: true,
            message: "Product benefit created successfully.",
            data: newBenefit,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

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

// update Product Benefit
export const updateProductBenefit = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId, features } = req.body;

        const existingBenefit = await ProductBenefits.findById(id);
        if (!existingBenefit) {
            return res.status(404).json({
                success: false,
                message: "Product benefit not found.",
            });
        }
        const parsedFeatures = features
            ? typeof features === "string"
                ? JSON.parse(features)
                : features
            : existingBenefit.features;

        if (parsedFeatures && (parsedFeatures.length < 4 || parsedFeatures.length > 6)) {
            return res.status(400).json({
                success: false,
                message: "Features must be between 4 and 6 items.",
            });
        }
        existingBenefit.productId = productId || existingBenefit.productId;
        existingBenefit.features = parsedFeatures;

        await existingBenefit.save();
        res.status(200).json({
            success: true,
            message: "Product benefit updated successfully.",
            data: existingBenefit,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// delete Product Benefit
export const deleteProductBenefit = async (req, res) => {
    try {
        const { id } = req.params;
        const benefit = await ProductBenefits.findById(id);
        if (!benefit) {
            return res.status(404).json({
                success: false,
                message: "Product benefit not found.",
            });
        }
        await ProductBenefits.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Product benefit deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
