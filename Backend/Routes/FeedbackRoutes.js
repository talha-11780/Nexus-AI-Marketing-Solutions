import { Router } from "express";
import { FeedbackController } from "../Controller/FeedbackController.js";

const router = Router();
// POST /Feedback saves customer feedback.
router.post("/", FeedbackController);
export default router;
