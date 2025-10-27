import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        timing: {
            type: Date,
            required: [true, "Deal timing is required"],
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
        ],
        bgImage: {
            type: String,
            required: [true, "Background image is required"],
        },
        deliveryNote: {
            type: String,
            default: "Delivery by Tomorrow",
        },
    },
    { timestamps: true }
);

const Deal = mongoose.model("Deal", dealSchema);
export default Deal;
