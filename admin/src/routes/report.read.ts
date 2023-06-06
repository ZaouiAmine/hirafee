import express, { Request, Response } from "express";
import {
  requireAuth,
  requireRole,
  validateRequest,
} from "@hirafee-platforme/common";

import { Report } from "../models/report";

const router = express.Router();

router.get(
  "/api/reports/:id",
  requireAuth,
  requireRole("admin"), // Middleware to restrict access to admin users only
  async (req: Request, res: Response) => {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).send("Report not found");
    }

    res.send(report);
  }
);

export { router as reportReadRouter };
