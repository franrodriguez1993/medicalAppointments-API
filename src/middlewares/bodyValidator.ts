import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validatorManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: 400, msg: "INVALID_BODY_REQUEST", data: errors.array() });
  }
  next();
};
