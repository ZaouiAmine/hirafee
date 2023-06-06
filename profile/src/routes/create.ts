import { requireAuth, validateRequest } from "@hirafee-platforme/common/build";
import { body } from "express-validator";
import express, { Request, Response } from "express";
import { Profile } from "../models/profile";

const router = express.Router();

router.post(
  "/api/profiles",
  requireAuth,
  [body("name").not().isEmpty().withMessage("name is required")],
  [body("biography").not().isEmpty().withMessage("bio is required")],
  [body("phoneNumber").not().isEmpty().withMessage("phoneNumber is required")],
  [body("location").not().isEmpty().withMessage("location is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, biography, phoneNumber, location, portfolio } = req.body;
    const profile = Profile.build({
      name,
      biography,
      phoneNumber,
      location,
      user: req.currentUser!.id,
      portfolio,
      banned: false,
    });
    await profile.save();
    res.status(201).send(profile);
  }
);

export { router as createProfileRouter };
