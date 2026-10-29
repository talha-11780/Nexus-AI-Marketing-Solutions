import CallBooking from "../Model/CallBooking.js";
import { createFormController } from "./createFormController.js";

// Save call-booking submissions in their own collection.
export const CallBookingController = createFormController(CallBooking, "Call booking saved.");
