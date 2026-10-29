import mongoose from "mongoose";

// All add, edit, and delete operations use this shared Service collection.
const serviceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    unique: true, // Enforce at most one service in each category.
    enum: ["lead-generation", "sales-automation", "marketing-automation", "customer-support"],
  },
  serviceDescription: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0.01 },
  isActive: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
