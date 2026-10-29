import { Router } from "express";
import { ContentApprovalRequestController } from "../Controller/ContentApprovalRequestController.js";

const router = Router();
// POST /ContentApproval saves a content review request.
router.post("/", ContentApprovalRequestController);
export default router;
