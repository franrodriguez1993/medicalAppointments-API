import { validatorManager } from "./bodyValidator";
import { body } from "express-validator";

/** BODY SPECIALTY **/

export const specialtyValidator = [
  body("name").trim().isString().isLength({ min: 3, max: 20 }).escape(),
  validatorManager,
];
