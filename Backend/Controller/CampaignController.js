import Campaign from "../Model/Campaign.js";
import { createFormController } from "./createFormController.js";

// Save campaign submissions in their own collection.
export const CampaignController = createFormController(Campaign, "Campaign saved.");
