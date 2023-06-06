import express, { Request, Response } from "express";
import { requireAuth, currentUser } from "@hirafee-platforme/common";
import { Gig } from "../models/gig";

const router = express.Router();

router.get(
  "/api/gigs",
  requireAuth,
  currentUser,
  async (req: Request, res: Response) => {
    let gigs;

    if (req.currentUser!.role === "admin") {
      // If the user has the role of admin, return all gigs
      gigs = await Gig.find();
    } else {
      // If the user is not an admin, return only their own gigs
      gigs = await Gig.find({ user: req.currentUser!.id });
    }

    res.send(gigs);
  }
);

export { router as readAllGigsRouter };
