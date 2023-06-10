import express, { Request, Response } from "express";
import {
  requireAuth,
  validateRequest,
  requireRole,
} from "@hirafee-platforme/common";
import { body } from "express-validator";
import { Review } from "../models/review";

const router = express.Router();

router.post(
  "/api/reviews",
  requireAuth,
  requireRole("client"),
  [
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be an integer between 1 and 5"),
    body("comment").not().isEmpty().withMessage("Comment is required"),
    // You may need additional validation rules based on your requirements
    body("artisanId").notEmpty().withMessage("User ID is required"),
    body("clientId").notEmpty().withMessage("User ID is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { rating, comment, artisanId, createdAt } = req.body;
    const review = Review.build({
      rating,
      comment,
      clientId: req.currentUser!.id, // Assuming you have authentication middleware that sets the currentUser property
      artisanId, // Replace <artisanId> with the ID of the artisan being reviewed
      createdAt,
    });
    await review.save();
    res.status(201).send(review);
  }
);

export { router as createReviewRouter };
