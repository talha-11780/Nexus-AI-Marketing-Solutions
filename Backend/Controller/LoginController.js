import User from "../Model/User.js";
import { hashPassword, verifyPassword } from "../Utils/password.js";
import { createSession } from "../Utils/authSession.js";

// Verify a registered user's credentials and return an access session.
export const LoginController = async (req, res) => {
  try {
    // Normalize email so capitalization and surrounding spaces do not affect lookup.
    const email = req.body?.email?.trim().toLowerCase();
    const password = req.body?.password;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare against the stored password hash without returning credential details.
    const result = await verifyPassword(password, user.password);
    if (!result.valid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Upgrade older plain-text credentials to a secure hash after a successful login.
    if (result.needsUpgrade) {
      user.password = await hashPassword(password);
      await user.save();
    }

    // The session utility grants admin access only to the allowlisted email.
    const { token, isAdmin } = createSession(user._id.toString(), user.email);
    return res.status(200).json({ message: "Login successful.", token, isAdmin });
  } catch (error) {
    console.error("Login failed:", error.message);
    return res.status(500).json({ message: "Login failed. Please try again." });
  }
};
