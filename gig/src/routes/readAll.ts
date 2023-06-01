import express, { Request, Response } from "express";
import { requireAuth } from "@hirafee-platforme/common";
import { Gig } from "../models/gig";

const router = express.Router();

router.get("/api/gigs", requireAuth, async (req: Request, res: Response) => {
  const gigs = await Gig.find();

  res.send(gigs);
});

export { router as readAllGigsRouter };
