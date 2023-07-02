import express, { Request, Response } from "express";
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  requireRole,
} from "@hirafee-platforme/common";
import { Gig } from "../models/gig";

const router = express.Router();

router.put(
  "/api/gigs/:id",
  requireAuth,
  requireRole("client", "artisan"),
  async (req: Request, res: Response) => {
    const gigId = req.params.id;
    const {
      title,
      description,
      budget,
      location,
      category,
      requirements,
      banned,
      clientId,
      proposals,
      takenBy,
    } = req.body;

    const gig = await Gig.findById(gigId);

    if (!gig) {
      throw new NotFoundError();
    }

    // Update only the provided fields
    if (title) gig.title = title;
    if (description) gig.description = description;
    if (budget) gig.budget = budget;
    if (location) gig.location = location;
    if (category) gig.category = category;
    if (requirements) gig.requirements = requirements;
    if (banned !== undefined) gig.banned = banned;
    if (clientId) gig.clientId = clientId;
    if (proposals) gig.proposals = proposals;
    if (takenBy == null) gig.takenBy = "";
    if (takenBy) {
      (gig.takenBy = takenBy), console.log("updated");
    }

    await gig.save();

    res.send(gig);
  }
);

export { router as updateGigRouter };
