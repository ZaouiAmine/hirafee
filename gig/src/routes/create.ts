import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@hirafee-platforme/common";
import { body } from "express-validator";
import { Gig } from "../models/gig";

const router = express.Router();

router.post(
  "/api/gigs",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("description").not().isEmpty().withMessage("Description is required"),
    body("budget")
      .isNumeric()
      .withMessage("Budget must be a number")
      .custom((value) => value > 0)
      .withMessage("Budget must be a positive number"),
    body("location").not().isEmpty().withMessage("Location is required"),
    body("category").not().isEmpty().withMessage("Category is required"),
    body("requirements").isArray().withMessage("Requirements must be an array"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, description, budget, location, category, requirements } =
      req.body;
    const gigs = Gig.build({
      title,
      description,
      budget,
      location,
      user: req.currentUser!.id,
      category,
      requirements,
    });
    await gigs.save();
    res.status(201).send(gigs);
  }
);

export { router as createGigRouter };
