import { Router } from "express";
import { TeamMemberController } from "../Controller/TeamMemberController.js";

const router = Router();
// POST /AddTeamMember saves a team invitation.
router.post("/", TeamMemberController);
export default router;
