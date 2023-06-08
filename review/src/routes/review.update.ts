import express, { Request, Response } from "express";
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from "@hirafee-platforme/common";
import { Review } from "../models/review";

const router = express.Router();

router.put(
  "/api/reviews/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
      throw new NotFoundError();
    }

    if (
      review.user.toString() !== req.currentUser!.id &&
      req.currentUser!.role !== "admin"
    ) {
      throw new NotAuthorizedError();
    }

    review.set({ rating, comment });

    await review.save();

    res.send(review);
  }
);

export { router as updateReviewRouter };
