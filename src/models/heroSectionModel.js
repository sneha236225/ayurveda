import mongoose from "mongoose";

const HeroSectionSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    buttonText: {
      type: String,
      required: [true, "Button text is required"],
    },
    buttonRedirectLink: {
      type: String,
      default: "#",
    },
  },
  { timestamps: true }
);

const HeroSectionData = mongoose.model("HomeSectionData", HeroSectionSchema);
export default HeroSectionData;
