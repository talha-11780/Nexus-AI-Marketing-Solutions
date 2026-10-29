import mongoose from "mongoose";

// Store review requests and the link to the content being reviewed.
const contentApprovalRequestSchema = new mongoose.Schema({
  contentTitle: { type: String, required: true, trim: true },
  contentType: { type: String, required: true, enum: ["blog-post", "social-media-post", "email", "ad-copy"] },
  contentLink: { type: String, required: true, trim: true },
  notes: { type: String, required: true, trim: true },
}, { timestamps: true });

export default mongoose.model("ContentApprovalRequest", contentApprovalRequestSchema);
