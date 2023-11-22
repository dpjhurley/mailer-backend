import { NextFunction, Response } from "express";
import { check, validationResult } from "express-validator";
import { SendMailRequest } from "../controllers/emailController";

export const sendEmailMiddleware = [
  check("to").isEmail().withMessage('Invalid "to" email address'),
  check("cc").isEmail().withMessage('Invalid "cc" email address'),
  check("subject").notEmpty().withMessage("Subject is required"),
  check("body").notEmpty().withMessage("Body is required"),
  (req: SendMailRequest, res: Response, next: NextFunction) => {
    const requestBodyErrors = validationResult(req);

    if (!requestBodyErrors.isEmpty()) {
      return res.status(400).send({ errors: requestBodyErrors.array() });
    }

    next();
  }
];
