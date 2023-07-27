import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import ResponseEntity from "../utils/ResponseEntity";

export const validatorManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(new ResponseEntity(400, "INVALID_BODY_REQUEST", errors.array()));
  }
  next();
};
