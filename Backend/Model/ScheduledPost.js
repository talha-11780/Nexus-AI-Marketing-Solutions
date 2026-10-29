import mongoose from "mongoose";

// Store post text and scheduling preferences; no social API is called here.
const scheduledPostSchema = new mongoose.Schema({
  caption: { type: String, required: true, trim: true },
  platform: { type: String, required: true, enum: ["facebook", "instagram", "linkedin", "twitter"] },
  postDate: { type: Date, required: true },
  addToQueue: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("ScheduledPost", scheduledPostSchema);
