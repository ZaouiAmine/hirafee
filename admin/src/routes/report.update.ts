import express, { Request, Response } from "express";
import {
  requireAuth,
  requireRole,
  validateRequest,
} from "@hirafee-platforme/common";
import { body } from "express-validator";
import { Report } from "../models/report";

const router = express.Router();

router.put(
  "/api/reports/:id",
  requireAuth,
  requireRole("admin"), // Middleware to restrict access to admin users only
  [body("reason").notEmpty().withMessage("Reason is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { reason } = req.body;

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).send("Report not found");
    }

    report.set({ reason });
    await report.save();

    res.send(report);
  }
);

export { router as reportUpdateRouter };
