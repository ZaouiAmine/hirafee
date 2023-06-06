import express, { Request, Response } from "express";
import { NotFoundError, requireAuth } from "@hirafee-platforme/common";
import { Gig } from "../models/gig";

const router = express.Router();

router.get(
  "/api/gigs/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      throw new NotFoundError();
    }
    // Check if the authenticated user is the owner of the gig or has the role of admin
    if (
      gig.user.toString() !== req.currentUser!.id &&
      req.currentUser!.role !== "admin"
    ) {
      throw new NotFoundError();
    }

    res.send(gig);
  }
);

export { router as readGigRouter };
