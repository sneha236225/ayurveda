import fs from "fs";
import path from "path";
import Product from "../../models/product.model.js";

const PRODUCT_UPLOAD_PATH = path.join("src/uploads/products");

const deleteUploadedFiles = (images) => {
    if (!images || images.length === 0) return;
    images.forEach((img) => {
        const imgPath = path.join(PRODUCT_UPLOAD_PATH, img);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    });
};

// Add Product
export const addProduct = async (req, res) => {
    const image = req.file?.filename;
    try {
        const { name, category, oldPrice, newPrice, description, inStock } = req.body;
        if (!name || !category || !newPrice || !description || !image) {
            if (image) deleteUploadedFiles([image]);
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided.",
            });
        }
        const product = await Product.create({
            name,
            category,
            oldPrice: oldPrice || 0,
            newPrice,
            description,
            image,
            inStock: inStock !== undefined ? inStock : true,
        });

        res.status(201).json({
            success: true,
            message: "Product added successfully.",
            data: product,
        });
    } catch (error) {
        if (req.file?.filename) deleteUploadedFiles([req.file.filename]);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Products fetched successfully.",
            data: products,
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
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });

        res.status(200).json({
            success: true,
            message: "Product fetched successfully.",
            data: product,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Update product
export const updateProduct = async (req, res) => {
    try {
        const { name, category, oldPrice, newPrice, description, inStock } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product)
            return res.status(404).json({ success: false, message: "Product not found." });

        let image = product.image;
        if (req.file) {
            deleteUploadedFiles([product.image]);
            image = req.file.filename;
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                category,
                oldPrice: oldPrice || product.oldPrice,
                newPrice: newPrice || product.newPrice,
                description,
                inStock: inStock !== undefined ? inStock : product.inStock,
                image,
            },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            data: updatedProduct,
        });
    } catch (error) {
        if (req.file?.filename) deleteUploadedFiles([req.file.filename]);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(404).json({ success: false, message: "Product not found." });

        deleteUploadedFiles([product.image]);
        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
