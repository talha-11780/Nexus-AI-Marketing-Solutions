import mongoose from "mongoose";

// A separate collection stores each customer's requested strategy-call time.
const callBookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  preferredDateTime: { type: Date, required: true },
  message: { type: String, required: true, trim: true },
}, { timestamps: true });

export default mongoose.model("CallBooking", callBookingSchema);
