import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RequestValidationError, validateRequest, BadRequestError } from "@hirafee/common";
import { body, validationResult } from "express-validator";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",

  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("password must be at least 4 carachters and at most 20."),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { password, email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });

    await user.save();
    // must check if jwt key is defined (index.ts)
    // generate jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
    // store it on session object
    req.session = {
      jwt: userJwt,
    };
    res.status(201).send(user);

    // console.log("user created");
  }
);

export { router as signupRouter };
