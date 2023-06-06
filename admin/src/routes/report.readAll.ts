import express, { Request, Response } from "express";
import { requireAuth, requireRole } from "@hirafee-platforme/common";

import { Report } from "../models/report";

const router = express.Router();

router.get(
  "/api/reports",
  requireAuth,
  requireRole("admin"), // Middleware to restrict access to admin users only
  async (req: Request, res: Response) => {
    const reports = await Report.find();

    res.send(reports);
  }
);

export { router as reportReadAllRouter };
