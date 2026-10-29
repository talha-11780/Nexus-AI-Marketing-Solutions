import TeamMember from "../Model/TeamMember.js";
import { createFormController } from "./createFormController.js";

// Save team-member invitation details; this does not create a login account.
export const TeamMemberController = createFormController(TeamMember, "Team member saved.");
