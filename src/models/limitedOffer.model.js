import mongoose from "mongoose";

const limitedTimeOfferSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true
  },
  timing: {
    type: String,
    required: [true, "Timing is required"],
    trim: true
  },
  redirectProductLink: {
    type: String,
    required: [true, "Redirect product link is required"],
    trim: true
  }
}, { timestamps: true });

const LimitedTimeOffer = mongoose.model("LimitedTimeOffer", limitedTimeOfferSchema);
export default LimitedTimeOffer;
