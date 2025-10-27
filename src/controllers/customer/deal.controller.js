import Deal from "../../models/deal.model.js";

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