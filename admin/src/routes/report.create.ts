import express, { Request, Response } from "express";
import {
  requireAuth,
  requireRole,
  validateRequest,
} from "@hirafee-platforme/common";
import { body } from "express-validator";
import { Report } from "../models/report";

const router = express.Router();

router.post(
  "/api/reports",
  requireAuth,
  requireRole("admin"), // Middleware to restrict access to admin users only
  [
    body("userId").notEmpty().withMessage("User ID is required"),
    body("gigId").notEmpty().withMessage("Gig ID is required"),
    body("reason").notEmpty().withMessage("Reason is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { userId, gigId, reason } = req.body;

    const report = Report.build({
      userId,
      gigId,
      reason,
      createdAt: new Date(),
    });

    await report.save();

    res.status(201).send(report);
  }
);

export { router as reportCreateRouter };
