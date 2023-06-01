import express, { Request, Response } from "express";
import { requireAuth, NotFoundError } from "@hirafee-platforme/common";
import { Gig } from "../models/gig";

const router = express.Router();

router.put(
  "/api/gigs/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const { title, description, budget, location, category, requirements } =
      req.body;

    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      throw new NotFoundError();
    }

    gig.set({
      title,
      description,
      budget,
      location,
      category,
      requirements,
    });

    await gig.save();

    res.send(gig);
  }
);

export { router as updateGigRouter };
