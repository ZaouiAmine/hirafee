import express, { Request, Response } from "express";
import { requireAuth, NotFoundError } from "@hirafee-platforme/common";
import { Profile } from "../models/profile";

const router = express.Router();

router.delete(
  "/api/profiles/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      throw new NotFoundError();
    }

    await Profile.findByIdAndDelete(req.params.id);

    res.status(204).send();
  }
);

export { router as deleteProfileRouter };
