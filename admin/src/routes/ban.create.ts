import express, { Request, Response } from "express";
import {
  requireAuth,
  requireRole,
  validateRequest,
} from "@hirafee-platforme/common";
import { body } from "express-validator";
import { Ban } from "../models/ban";

const router = express.Router();

router.post(
  "/api/bans",
  requireAuth,
  requireRole("admin"), // Middleware to restrict access to admin users only
  [
    body("userId").notEmpty().withMessage("User ID is required"),
    body("reason").notEmpty().withMessage("Reason is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { userId, reason } = req.body;

    const ban = Ban.build({
      userId,
      reason,
      createdAt: new Date(),
    });

    await ban.save();

    res.status(201).send(ban);
  }
);

export { router as banCreateRouter };
