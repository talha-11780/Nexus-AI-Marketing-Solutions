import express from "express";
import mongoose from "mongoose";
import { requireAdmin } from "./Utils/authSession.js";
import { loadEnvFile } from "node:process";
import { fileURLToPath } from "node:url";
import cors from "cors";
import authRoutes from "./Routes/AuthRoutes.js";
import loginRoutes from "./Routes/LoginRoutes.js";
import contactQueryRoutes from "./Routes/ContactQueryRoutes.js";
import callBookingRoutes from "./Routes/CallBookingRoutes.js";
import campaignRoutes from "./Routes/CampaignRoutes.js";
import teamMemberRoutes from "./Routes/TeamMemberRoutes.js";
import serviceRoutes from "./Routes/ServiceRoutes.js";
import serviceDeletionRoutes from "./Routes/DeleteServiceRoutes.js";
import serviceEditRoutes from "./Routes/EditServiceRoutes.js";
import contentApprovalRequestRoutes from "./Routes/ContentApprovalRequestRoutes.js";
import feedbackRoutes from "./Routes/FeedbackRoutes.js";
import scheduledPostRoutes from "./Routes/ScheduledPostRoutes.js";

// Load private database credentials from Backend/.env without hard-coding them.
loadEnvFile(fileURLToPath(new URL("./.env", import.meta.url)));

const app = express();

// Enable frontend requests and parse JSON request bodies.
app.use(cors());
app.use(express.json());

// Public forms and login do not require a session.
app.use("/Registration", authRoutes);
app.use("/Login", loginRoutes);
app.use("/ContactUs", contactQueryRoutes);
app.use("/BookFreeCall", callBookingRoutes);

// Admin and marketing operations require the allowlisted admin session.
app.use("/CampaignCreation", requireAdmin, campaignRoutes);
app.use("/AddTeamMember", requireAdmin, teamMemberRoutes);
app.use("/AddService", requireAdmin, serviceRoutes);
app.use("/DeleteService", requireAdmin, serviceDeletionRoutes);
app.use("/EditService", requireAdmin, serviceEditRoutes);
app.use("/ContentApproval", requireAdmin, contentApprovalRequestRoutes);
app.use("/PostScheduler", requireAdmin, scheduledPostRoutes);
app.use("/Feedback", feedbackRoutes);

// Start accepting requests only when MongoDB is available.
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is empty. Add your Atlas connection URI to Backend/.env.");
  process.exitCode = 1;
} else {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(5000, () => {
        console.log("Server is running on port 5000");
      });
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
      process.exitCode = 1;
    });
}

export default app;
