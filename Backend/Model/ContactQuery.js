import mongoose from "mongoose";

// Keep contact requests separate and restrict service choices to form options.
const contactQuerySchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  website: { type: String, required: true, trim: true },
  services: {
    type: String,
    required: true,
    enum: ["lead-generation", "sales-automation", "customer-support", "marketing-automation", "business-process", "local-growth", "other"],
  },
  query: { type: String, required: true, trim: true },
  confirmContact: { type: Boolean, required: true, enum: [true] },
}, { timestamps: true });

export default mongoose.model("ContactQuery", contactQuerySchema);
