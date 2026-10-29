import ContentApprovalRequest from "../Model/ContentApprovalRequest.js";
import { createFormController } from "./createFormController.js";

// Save content review requests separately from the content itself.
export const ContentApprovalRequestController = createFormController(
  ContentApprovalRequest,
  "Content approval request saved.",
);
