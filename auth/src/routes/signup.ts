import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { body, validationResult } from "express-validator";
import { RequestValidationError } from "@hirafee-platforme/common";
import { DatabaseConnectionError } from "@hirafee-platforme/common";
import { User } from "../models/user";
import { BadRequestError } from "@hirafee-platforme/common";

const router = express.Router();

router.post(
  "/api/users/signup",

  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("password must be at least 4 characters and at most 20."),
    body("role") // Add validation for the role attribute
      .notEmpty()
      .withMessage("role is required")
      .isIn(["admin", "artisan", "client"]) // Specify the allowed roles
      .withMessage("role must be either 'admin', 'artisan', or 'client'"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { password, email, role } = req.body; // Extract the role from req.body

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password, role, banned: false }); // Include the role during user creation

    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role, // Include the role in the JWT payload
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
