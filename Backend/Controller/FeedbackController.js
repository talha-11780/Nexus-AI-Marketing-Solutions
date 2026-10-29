import Feedback from "../Model/Feedback.js";
import { createFormController } from "./createFormController.js";

// Save customer feedback in its own collection.
export const FeedbackController = createFormController(Feedback, "Feedback saved.");
