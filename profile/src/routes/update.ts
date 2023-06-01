import express, { Request, Response } from "express";
import { requireAuth, NotFoundError } from "@hirafee-platforme/common";
import { Profile } from "../models/profile";

const router = express.Router();

router.put(
  "/api/profiles/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const { name, biography, phoneNumber, location, portfolio } = req.body;

    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      throw new NotFoundError();
    }

    profile.set({
      name,
      biography,
      phoneNumber,
      location,
      portfolio,
    });

    await profile.save();

    res.send(profile);
  }
);

export { router as updateProfileRouter };
