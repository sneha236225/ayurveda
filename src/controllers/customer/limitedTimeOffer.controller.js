import LimitedTimeOffer from "../../models/limitedOffer.model.js";

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
