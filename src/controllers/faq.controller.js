import mongoose from "mongoose";
import Faq from "../models/faq.model.js";

// add faq
export const addFaq = async (req, res) => {
    try {
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({
                message: "Both question and answer are required.",
            });
        }
        const faq = await Faq.create({ question, answer });
        return res.status(201).json({
            message: "FAQ created successfully.",
            data: faq,
        });
    } catch (error) {
        console.error("Error in creating FAQ:", error);
        return res.status(500).json({
            message: "Internal server error. Please try again later.",
        });
    }
};

// get all faq
export const getAllFaq = async (req, res) => {
    try {
        const faqs = await Faq.find().sort({ createdAt: -1 });
        return res.status(200).json({
            message: "FAQs fetched successfully",
            data: faqs,
        });
    } catch (error) {
        console.error("Error in fetching FAQs:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// get faq by id
export const getFaqById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid FAQ ID." });
        }
        const faq = await Faq.findById(id);
        if (!faq) {
            return res.status(404).json({ message: "FAQ not found." });
        }
        return res.status(200).json({
            message: "FAQ fetched successfully.",
            data: faq,
        });
    } catch (error) {
        console.error("Error in getFaqById:", error);
        return res.status(500).json({
            message: "Internal server error.",
        });
    }
};

// update faq
export const updateFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format." });
        }
        const updatedFaq = await Faq.findByIdAndUpdate(
            id,
            { question, answer },
            { new: true, runValidators: true }
        );
        if (!updatedFaq) {
            return res.status(404).json({ message: "FAQ not found." });
        }
        return res.status(200).json({
            message: "FAQ updated successfully.",
            data: updatedFaq,
        });
    } catch (error) {
        console.error("Error in updating FAQ:", error);
        return res.status(500).json({
            message: "Internal server error.",
        });
    }
};

// delete faq
export const deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID format",
            });
        }
        const deletedFaq = await Faq.findByIdAndDelete(id);
        if (!deletedFaq) {
            return res.status(404).json({
                message: "FAQ not found",
            });
        }
        return res.status(200).json({
            message: "FAQ deleted successfully",
            deletedFaq,
        });
    } catch (error) {
        console.error("Error in deleting FAQ:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
