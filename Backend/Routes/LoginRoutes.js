import { Router } from "express";
import { LoginController } from "../Controller/LoginController.js";

const router = Router();
// POST /Login verifies credentials and returns a session token.
router.post("/", LoginController);
export default router;
