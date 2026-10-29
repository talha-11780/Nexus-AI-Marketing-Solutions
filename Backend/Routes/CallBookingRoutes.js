import { Router } from "express";
import { CallBookingController } from "../Controller/CallBookingController.js";

const router = Router();
// POST /BookFreeCall saves a call-booking form.
router.post("/", CallBookingController);
export default router;
