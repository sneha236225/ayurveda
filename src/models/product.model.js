import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    oldPrice: {
      type: Number,
      default: 0,
    },
    newPrice: {
      type: Number,
      required: [true, "New price is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
