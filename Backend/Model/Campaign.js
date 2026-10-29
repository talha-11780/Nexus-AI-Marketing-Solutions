import mongoose from "mongoose";

// Define the fields and allowed platforms for saved marketing campaigns.
const campaignSchema = new mongoose.Schema({
  campaignName: { type: String, required: true, trim: true },
  platform: { type: String, required: true, enum: ["facebook", "instagram", "google-ads", "linkedin"] },
  startDate: { type: Date, required: true },
  budget: { type: Number, required: true, min: 0.01 },
  goal: { type: String, required: true, trim: true },
}, { timestamps: true });

export default mongoose.model("Campaign", campaignSchema);
