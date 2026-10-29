import mongoose from "mongoose";

// Store registration and login credentials; password contains a salted hash.
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Prevent separate accounts from sharing the same username.
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Login and account lookup use the email address.
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
  },
  industry: {
    type: String,
    enum: ["ecommerce", "real-estate", "consulting", "clinic", "other"],
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;