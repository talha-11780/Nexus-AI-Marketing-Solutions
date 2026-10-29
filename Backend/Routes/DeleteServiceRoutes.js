import { Router } from "express";
import { ServiceDeletionController } from "../Controller/ServiceDeletionController.js";

const router = Router();
// POST /DeleteService removes a confirmed service from the shared Service collection.
router.post("/", ServiceDeletionController);
export default router;
