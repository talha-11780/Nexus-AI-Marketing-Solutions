import { Router } from "express";
import { ContactQueryController } from "../Controller/ContactQueryController.js";

const router = Router();
// POST /ContactUs saves a customer's question.
router.post("/", ContactQueryController);
export default router;
