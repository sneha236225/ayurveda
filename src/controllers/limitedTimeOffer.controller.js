import LimitedTimeOffer from "../models/limitedOffer.model.js";

// get limited time offers
export const getLimitedTimeOffer = async (req, res) => {
    try {
        const offer = await LimitedTimeOffer.find();
        if (!offer) {
            return res.status(404).json({ success: false, message: "No offer found" });
        }
        res.status(200).json({
            success: true,
            message: "Limited Time Offer fetched successfully",
            data: offer
        });
    } catch (error) {
        console.error("Error fetching limited time offer:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
