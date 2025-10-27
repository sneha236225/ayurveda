import fs from "fs";
import path from "path";
import Deal from "../../models/deal.model.js";

const DEAL_UPLOAD_PATH = path.join("src/uploads/deals");

const deleteUploadedFiles = (images) => {
    if (!images || images.length === 0) return;
    images.forEach((img) => {
        const imgPath = path.join(DEAL_UPLOAD_PATH, img);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    });
};

// Create Deal
export const createDeal = async (req, res) => {
    const bgImage = req.file?.filename;
    try {
        const { title, description, timing, products, deliveryNote } = req.body;
        if (!title || !description || !timing || !products || !bgImage) {
            if (bgImage) deleteUploadedFiles([bgImage]);
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }
        const existingDeal = await Deal.findOne();
        if (existingDeal) {
            if (existingDeal.bgImage) deleteUploadedFiles([existingDeal.bgImage]);
            await Deal.deleteMany();
        }

        const productArray = typeof products === "string" ? products.split(",") : products;

        const deal = await Deal.create({
            title,
            description,
            timing: new Date(timing),
            products: productArray,
            bgImage,
            deliveryNote,
        });
        return res.status(201).json({
            success: true,
            message: "Deal created successfully.",
            data: deal,
        });
    } catch (error) {
        if (req.file?.filename) deleteUploadedFiles([req.file.filename]);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// get current Deal
export const getDeal = async (req, res) => {
    try {
        const deal = await Deal.findOne().populate("products");
        if (!deal)
            return res.status(404).json({
                success: false,
                message: "No deal available currently.",
            });

        res.status(200).json({
            success: true,
            message: "Deal fetched successfully.",
            data: deal,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Add Product to existing Deal
export const addProductToDeal = async (req, res) => {
    try {
        const { productIds } = req.body;
        if (!productIds || productIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide productIds to add.",
            });
        }

        const deal = await Deal.findOne();
        if (!deal) {
            return res.status(404).json({
                success: false,
                message: "No existing deal found.",
            });
        }
        const newProducts = productIds.filter(
            (id) => !deal.products.map(String).includes(id)
        );
        if (newProducts.length === 0) {
            return res.status(400).json({
                success: false,
                message: "All given products already exist in the deal.",
            });
        }
        deal.products.push(...newProducts);
        await deal.save();

        res.status(200).json({
            success: true,
            message: "Products added successfully to the deal.",
            data: deal,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Remove Product from Deal
export const removeProductFromDeal = async (req, res) => {
    try {
        const { productIds } = req.body;
        if (!productIds || productIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide productIds to remove.",
            });
        }

        const deal = await Deal.findOne();
        if (!deal) {
            return res.status(404).json({
                success: false,
                message: "No existing deal found.",
            });
        }
        deal.products = deal.products.filter(
            (p) => !productIds.includes(p.toString())
        );
        await deal.save();

        res.status(200).json({
            success: true,
            message: "Products removed successfully from the deal.",
            data: deal,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Delete Deal
export const deleteDeal = async (req, res) => {
    try {
        const existingDeal = await Deal.findOne();
        if (!existingDeal)
            return res.status(404).json({
                success: false,
                message: "No deal found to delete.",
            });

        if (existingDeal.bgImage) deleteUploadedFiles([existingDeal.bgImage]);
        await Deal.deleteMany();

        res.status(200).json({
            success: true,
            message: "Deal deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
