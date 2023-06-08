import express, { Request, Response } from "express";
import { requireAuth, NotFoundError } from "@hirafee-platforme/common";
import { body } from "express-validator";
import { Profile } from "../models/profile";

const router = express.Router();

router.put(
  "/api/profiles/:id",
  requireAuth,
  [
    body("email").optional().isString().withMessage("email must be a string"),
    body("role")
      .optional()
      .isString()
      .isIn(["artisan", "admin", "client"])
      .withMessage("Invalid role value"),
    body("firstName")
      .optional()
      .isString()
      .withMessage("firstName must be a string"),
    body("lastName")
      .optional()
      .isString()
      .withMessage("lastName must be a string"),
    body("username")
      .optional()
      .isString()
      .withMessage("username must be a string"),
    body("biography")
      .optional()
      .isString()
      .withMessage("biography must be a string"),
    body("phoneNumber")
      .optional()
      .isString()
      .withMessage("phoneNumber must be a string"),
    body("location")
      .optional()
      .isString()
      .withMessage("location must be a string"),
  ],

  async (req: Request, res: Response) => {
    const {
      email,
      role,
      firstName,
      lastName,
      username,
      biography,
      phoneNumber,
      location,
      portfolio,
      banned,
      belongsTo,
      createdTheProfile,
    } = req.body;

    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      throw new NotFoundError();
    }

    profile.set({
      email,
      role,
      firstName,
      lastName,
      username,
      biography,
      phoneNumber,
      location,
      portfolio,
      banned,
      belongsTo,
      createdTheProfile,
    });

    await profile.save();

    res.send(profile);
  }
);

export { router as updateProfileRouter };
