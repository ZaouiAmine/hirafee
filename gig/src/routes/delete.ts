import express, { Request, Response } from "express";
import { requireAuth, NotFoundError } from "@hirafee-platforme/common";
import { Gig } from "../models/gig";

const router = express.Router();

router.delete(
  "/api/gigs/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      throw new NotFoundError();
    }

    await Gig.findByIdAndDelete(req.params.id);

    res.status(204).send();
  }
);

export { router as deleteGigRouter };
