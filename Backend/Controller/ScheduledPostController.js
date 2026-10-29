import ScheduledPost from "../Model/ScheduledPost.js";
import { createFormController } from "./createFormController.js";

// Save scheduled-post details; this endpoint does not publish to social media.
export const ScheduledPostController = createFormController(ScheduledPost, "Scheduled post saved.");
