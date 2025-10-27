import mongoose from "mongoose";
import Category from "../models/category.model.js";

// Add Category
export const addCategory = async (req, res) => {
    try {
        const { title, image } = req.body;
        if (!title || !image) {
            return res.status(400).json({ message: "Title and image are required" });
        }

        const category = await Category.create({ title, image });
        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
        });
    } catch (error) {
        console.error("Error in addCategory:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get All Categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: categories,
        });
    } catch (error) {
        console.error("Error in getAllCategories:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get Single Category
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: category,
        });
    } catch (error) {
        console.error("Error in getCategoryById:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update Category
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, image } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const updated = await Category.findByIdAndUpdate(
            id,
            { title, image },
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updated,
        });
    } catch (error) {
        console.error("Error in updateCategory:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Delete Category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const deleted = await Category.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.error("Error in deleteCategory:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
