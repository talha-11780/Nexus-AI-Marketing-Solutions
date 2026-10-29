import { Router } from "express";
import { ScheduledPostController } from "../Controller/ScheduledPostController.js";

const router = Router();
// POST /PostScheduler saves a planned post.
router.post("/", ScheduledPostController);
export default router;
