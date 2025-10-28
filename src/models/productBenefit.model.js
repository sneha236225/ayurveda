import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Feature title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Feature description is required"],
        trim: true,
    },
});

const productBenefitsSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        features: {
            type: [featureSchema],
            validate: {
                validator: function (v) {
                    return v.length >= 4 && v.length <= 6;
                },
                message: "Features must be between 4 and 6 items.",
            },
        },
    },
    { timestamps: true }
);

const ProductBenefits = mongoose.model("ProductBenefits", productBenefitsSchema);
export default ProductBenefits;
