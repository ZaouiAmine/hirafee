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
    body("type")
      .notEmpty()
      .isIn(["gig", "profile"])
      .withMessage("Invalid report type"),
    body("reportedItemId")
      .notEmpty()
      .withMessage("Reported item ID is required"),
    body("reason").notEmpty().withMessage("Reason is required"),
    body("state")
      .notEmpty()
      .isIn(["processed", "unprocessed"])
      .withMessage("Invalid report state"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { type, reportedItemId, reason, state } = req.body;

    const report = Report.build({
      type,
      reportedItemId,
      reason,
      state,
      createdAt: new Date(),
    });

    await report.save();

    res.status(201).send(report);
  }
);

export { router as reportCreateRouter };
