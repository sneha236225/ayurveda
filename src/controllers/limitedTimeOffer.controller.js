import LimitedTimeOffer from "../models/limitedOffer.model.js";
import mongoose from "mongoose";

// Create Offer
export const createLimitedTimeOffer = async (req, res) => {
    try {
        const { title, timing, redirectProductLink } = req.body;

        if (!title || !timing || !redirectProductLink) {
            return res.status(400).json({
                success: false,
                message: "All fields (title, timing, redirectProductLink) are required.",
            });
        }

        const offer = await LimitedTimeOffer.create({
            title,
            timing: new Date(timing),
            redirectProductLink,
        });

        res.status(201).json({
            success: true,
            message: "Limited Time Offer created successfully.",
            data: offer,
        });
    } catch (error) {
        console.error("Error creating offer:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get All Offers
export const getLimitedTimeOffers = async (req, res) => {
    try {
        const offers = await LimitedTimeOffer.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Limited Time Offers fetched successfully.",
            data: offers,
        });
    } catch (error) {
        console.error("Error fetching offers:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get Single Offer by ID
export const getLimitedTimeOfferById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ success: false, message: "Invalid ID." });

        const offer = await LimitedTimeOffer.findById(id);
        if (!offer)
            return res.status(404).json({ success: false, message: "Offer not found." });

        res.status(200).json({
            success: true,
            message: "Limited Time Offer fetched successfully.",
            data: offer,
        });
    } catch (error) {
        console.error("Error fetching offer:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Update Offer
export const updateLimitedTimeOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, timing, redirectProductLink } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ success: false, message: "Invalid ID." });

        const updatedOffer = await LimitedTimeOffer.findByIdAndUpdate(
            id,
            { title, timing, redirectProductLink },
            { new: true, runValidators: true }
        );

        if (!updatedOffer)
            return res.status(404).json({ success: false, message: "Offer not found." });

        res.status(200).json({
            success: true,
            message: "Limited Time Offer updated successfully.",
            data: updatedOffer,
        });
    } catch (error) {
        console.error("Error updating offer:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Delete Offer
export const deleteLimitedTimeOffer = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ success: false, message: "Invalid ID." });

        const deletedOffer = await LimitedTimeOffer.findByIdAndDelete(id);
        if (!deletedOffer)
            return res.status(404).json({ success: false, message: "Offer not found." });

        res.status(200).json({
            success: true,
            message: "Limited Time Offer deleted successfully.",
            data: deletedOffer,
        });
    } catch (error) {
        console.error("Error deleting offer:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
