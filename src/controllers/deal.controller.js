import TodayDeal from "../models/deal.model.js";

// Get All Deals
export const getAllDeals = async (req, res) => {
  try {
    const deals = await TodayDeal.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Today's deals fetched successfully",
      data: deals,
    });
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Add Deal
export const addDeal = async (req, res) => {
  try {
    const { productName, image, price, originalPrice, deliveryInfo, dealEndsIn } = req.body;
    if (!productName || !image || !price || !originalPrice || !dealEndsIn) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }
    const newDeal = await TodayDeal.create({
      productName,
      image,
      price,
      originalPrice,
      deliveryInfo,
      dealEndsIn,
    });
    res.status(201).json({
      success: true,
      message: "Deal added successfully",
      data: newDeal,
    });
  } catch (error) {
    console.error("Error adding deal:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
