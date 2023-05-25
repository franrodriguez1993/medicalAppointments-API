import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const validatorManager = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: 400, msg: "INVALID_BODY_REQUEST", data: errors.array() });
  }
  next();
};

/**  STAFF REGISTER **/
export const validateStaffBody = [
  body("name").trim().isLength({ min: 3, max: 50 }).escape(),
  body("lastname").trim().isLength({ min: 3, max: 50 }).escape(),
  body("mail").trim().isEmail(),
  body("password").trim().isLength({ min: 6, max: 30 }),
  body("cellphone").trim().isLength({ min: 6, max: 20 }),
  body("dni").trim().isLength({ min: 8, max: 9 }).escape(),
  validatorManager,
];

/**  STAFF LOGIN **/
export const validateLoginBody = [
  body("mail").trim().isEmail(),
  body("password").trim().isLength({ min: 6, max: 30 }),
  validatorManager,
];
