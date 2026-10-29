import mongoose from "mongoose";

// Store team invitation details and restrict roles to the supported options.
const teamMemberSchema = new mongoose.Schema({
  memberName: { type: String, required: true, trim: true },
  memberEmail: { type: String, required: true, trim: true, lowercase: true },
  role: { type: String, required: true, enum: ["admin", "editor", "viewer"] },
}, { timestamps: true });

export default mongoose.model("TeamMember", teamMemberSchema);
