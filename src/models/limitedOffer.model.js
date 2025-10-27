import mongoose from "mongoose";

const limitedTimeOfferSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    timing: {
      type: Date,
      required: [true, "Offer timing is required"],
    },
    redirectProductLink: {
      type: String,
      required: [true, "Redirect product link is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const LimitedTimeOffer = mongoose.model("LimitedTimeOffer", limitedTimeOfferSchema);
export default LimitedTimeOffer;
