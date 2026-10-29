import mongoose from "mongoose";

// Store feedback independently from user accounts and other form submissions.
const feedbackSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  rating: { type: String, required: true, enum: ["poor", "average", "good", "excellent"] },
  feedback: { type: String, required: true, trim: true },
}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);
