import mongoose from "mongoose";

const limitedTimeOfferSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true
  },
  timing: {
    type: Date,
    required: [true, "Timing is required"]
  },
  redirectProductLink: {
    type: String,
    required: [true, "Redirect product link is required"],
    trim: true
  },
  bgImage: {
    type: String,
    required: [true, "Background image is required"]
  }
}, { timestamps: true });

const LimitedTimeOffer = mongoose.model("LimitedTimeOffer", limitedTimeOfferSchema);
export default LimitedTimeOffer;
