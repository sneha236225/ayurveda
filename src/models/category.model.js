import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Category title is required"],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Category image is required"],
        },
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
