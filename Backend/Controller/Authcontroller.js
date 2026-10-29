import User from "../Model/User.js";
import { hashPassword } from "../Utils/password.js";

// Registration Controller
export const Authcontroller = async (req, res) => {
  try {
    // Read and check the fields required to create a user account.
    const { fullName, email, phone, industry, password } = req.body ?? {};
    if (
      typeof fullName !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string" ||
      typeof industry !== "string" ||
      typeof password !== "string" ||
      !fullName.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({ message: "Please complete all required registration fields." });
    }

    // Store passwords as a salted hash, never as plain text.
    const newUser = new User({
      fullName,
      username: req.body.username || email,
      email,
      phone,
      industry,
      password: await hashPassword(password),
    });

    // Save the validated account in the User collection.
    await newUser.save();

    // Report successful registration to the frontend.
    return res.status(201).send("User registered successfully");
  } catch (error) {
    // Convert validation and duplicate-email errors into useful HTTP statuses.
    const status = error.name === "ValidationError" ? 400 : error.code === 11000 ? 409 : 500;
    return res.status(status).json({
      message: status === 409
        ? "An account with this email already exists."
        : status === 400
          ? "Please check the submitted registration fields."
          : "Registration failed. Please try again.",
    });
  }
};