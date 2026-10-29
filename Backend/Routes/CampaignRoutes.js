import { Router } from "express";
import { CampaignController } from "../Controller/CampaignController.js";

const router = Router();
// POST /CampaignCreation saves a campaign form.
router.post("/", CampaignController);
export default router;
