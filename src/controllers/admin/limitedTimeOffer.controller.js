import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import LimitedTimeOffer from "../../models/limitedOffer.model.js";

const OFFER_UPLOAD_PATH = path.join("src/uploads/offers");

const deleteUploadedFiles = (images) => {
  if (!images || images.length === 0) return;
  images.forEach(img => {
    const imgPath = path.join(OFFER_UPLOAD_PATH, img);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  });
};

// create Offer
export const createLimitedTimeOffer = async (req, res) => {
  const bgImage = req.file?.filename;
  try {
    const { title, timing, redirectProductLink } = req.body;
    if (!title || !timing || !redirectProductLink || !bgImage) {
      if (bgImage) deleteUploadedFiles([bgImage]);
      return res.status(400).json({
        success: false,
        message: "All fields (title, timing, redirectProductLink, bgImage) are required.",
      });
    }
    const existingOffer = await LimitedTimeOffer.findOne();
    if (existingOffer) {
      if (existingOffer.bgImage) deleteUploadedFiles([existingOffer.bgImage]);
      await LimitedTimeOffer.deleteMany();
    }
    const offer = await LimitedTimeOffer.create({
      title,
      timing: new Date(timing),
      redirectProductLink,
      bgImage,
    });

    res.status(201).json({
      success: true,
      message: "Limited Time Offer created successfully (previous offer replaced).",
      data: offer,
    });
  } catch (error) {
    if (req.file?.filename) deleteUploadedFiles([req.file.filename]);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Get Single Active Offer
export const getLimitedTimeOffer = async (req, res) => {
  try {
    const offer = await LimitedTimeOffer.findOne();
    if (!offer)
      return res.status(404).json({ success: false, message: "No active offer found." });

    res.status(200).json({
      success: true,
      message: "Limited Time Offer fetched successfully.",
      data: offer,
    });
  } catch (error) {
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

    const offer = await LimitedTimeOffer.findById(id);
    if (!offer)
      return res.status(404).json({ success: false, message: "Offer not found." });

    let bgImage = offer.bgImage;
    if (req.file) {
      deleteUploadedFiles([offer.bgImage]);
      bgImage = req.file.filename;
    }

    const updatedOffer = await LimitedTimeOffer.findByIdAndUpdate(
      id,
      { title, timing, redirectProductLink, bgImage },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Limited Time Offer updated successfully.",
      data: updatedOffer,
    });
  } catch (error) {
    if (req.file?.filename) deleteUploadedFiles([req.file.filename]);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete Offer
export const deleteLimitedTimeOffer = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid ID." });

    const offer = await LimitedTimeOffer.findById(id);
    if (!offer)
      return res.status(404).json({ success: false, message: "Offer not found." });

    deleteUploadedFiles([offer.bgImage]);
    await offer.deleteOne();

    res.status(200).json({ success: true, message: "Limited Time Offer deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
