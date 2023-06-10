import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { body, validationResult } from "express-validator";
import { RequestValidationError } from "@hirafee-platforme/common";
import { User } from "../models/user";
import { BadRequestError } from "@hirafee-platforme/common";

const router = express.Router();

router.post(
  "/api/users/signup",

  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters."),
    body("role")
      .notEmpty()
      .withMessage("Role is required")
      .isIn(["admin", "artisan", "client"])
      .withMessage("Role must be either 'admin', 'artisan', or 'client'"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("phoneNumber").notEmpty().withMessage("Phone number is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("biography").notEmpty().withMessage("Biography is required"),
    body("categorie").notEmpty().withMessage("Category is required"),
    // body("portfolio").isArray().withMessage("Portfolio must be an array"),
    // body("portfolio.*.image")
    //   .notEmpty()
    //   .withMessage("Portfolio item image is required"),
    // body("portfolio.*.description")
    //   .notEmpty()
    //   .withMessage("Portfolio item description is required"),
    body("belongsTo").notEmpty().withMessage("Belongs to is required"),

    body("createdTheProfile")
      .notEmpty()
      .withMessage("Created the profile is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const {
      email,
      password,
      firstName,
      lastName,
      username,
      phoneNumber,
      location,
      biography,
      categorie,
      // portfolio,
      role,
      belongsTo,
      createdTheProfile,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({
      email,
      password,
      firstName,
      lastName,
      username,
      phoneNumber,
      location,
      biography,
      categorie,
      portfolio: [],
      role,
      belongsTo,
      createdTheProfile,
      banned: false,
    });

    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
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
