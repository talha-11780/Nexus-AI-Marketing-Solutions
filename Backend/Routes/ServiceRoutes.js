import { Router } from "express";
import { ServiceController } from "../Controller/ServiceController.js";

const router = Router();
// POST /AddService creates a service in the shared Service collection.
router.post("/", ServiceController);
export default router;
