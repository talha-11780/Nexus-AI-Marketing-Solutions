import express from "express";
import { Router } from "express";
import {
  Authcontroller
} from "../Controller/Authcontroller.js";
const router = express.Router();

// POST /Registration creates a user account.
router.post("/", Authcontroller);


export default router;