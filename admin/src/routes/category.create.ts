import express, { Request, Response } from "express";
import {
  requireAuth,
  requireRole,
  validateRequest,
} from "@hirafee-platforme/common";
import { body } from "express-validator";
import { Category } from "../models/category";

const router = express.Router();

router.post(
  "/api/categories",
  requireAuth,
  requireRole("admin"), // Middleware to restrict access to admin users only
  [body("name").notEmpty().withMessage("Name is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const category = Category.build({
      name,
    });

    await category.save();

    res.status(201).send(category);
  }
);

export { router as categoryCreateRouter };
