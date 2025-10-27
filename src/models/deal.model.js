import mongoose from "mongoose";

const todayDealSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Product image is required"],
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
        },
        originalPrice: {
            type: Number,
            required: [true, "Original price is required"],
        },
        deliveryInfo: {
            type: String,
            default: "Delivery by Tomorrow",
        },
        dealEndsIn: {
            type: Date,
            required: [true, "Deal end date is required"],
        },
    },
    { timestamps: true }
);

const TodayDeal = mongoose.model("TodayDeal", todayDealSchema);
export default TodayDeal;
