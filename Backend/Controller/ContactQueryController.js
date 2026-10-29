import ContactQuery from "../Model/ContactQuery.js";
import { createFormController } from "./createFormController.js";

// Save contact-us questions in their own collection.
export const ContactQueryController = createFormController(ContactQuery, "Contact query saved.");
