import { Router } from "express";
import { ServiceEditController } from "../Controller/ServiceEditController.js";

const router = Router();
// POST /EditService updates a service in the shared Service collection.
router.post("/", ServiceEditController);
export default router;
