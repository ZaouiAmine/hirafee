import express, { Request, Response } from "express";
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from "@hirafee-platforme/common";
import { Gig } from "../models/gig";

const router = express.Router();

router.put(
  "/api/gigs/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const {
      title,
      description,
      budget,
      location,
      category,
      requirements,
      banned,
    } = req.body;

    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      throw new NotFoundError();
    }

    if (
      gig.user.toString() !== req.currentUser!.id &&
      req.currentUser!.role !== "admin"
    ) {
      throw new NotAuthorizedError();
    }

    gig.set({
      title,
      description,
      budget,
      location,
      category,
      requirements,
      banned,
    });

    await gig.save();

    res.send(gig);
  }
);

export { router as updateGigRouter };
