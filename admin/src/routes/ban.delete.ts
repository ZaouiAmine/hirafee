import express, { Request, Response } from "express";
import {
  requireAuth,
  requireRole,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
} from "@hirafee-platforme/common";
import { body } from "express-validator";
import { Ban } from "../models/ban";

const router = express.Router();

router.delete(
  "/api/bans/:id",
  requireAuth,
  requireRole("admin"), // Middleware to restrict access to admin users only
  async (req: Request, res: Response) => {
    const ban = await Ban.findById(req.params.id);

    if (!ban) {
      throw new NotFoundError();
    }

    // Check if the authenticated user has the role of admin
    if (req.currentUser!.role !== "admin") {
      throw new NotAuthorizedError();
    }

    await Ban.findByIdAndDelete(req.params.id);

    res.status(204).send();
  }
);

export { router as banDeleteRouter };
