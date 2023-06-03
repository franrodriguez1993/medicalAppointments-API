import { body } from "express-validator";
import { validatorManager } from "./bodyValidator";

/**  PATIENT VALIDATOR  **/

export const patientValidator = [
  body("name").trim().isLength({ min: 3, max: 50 }).escape(),
  body("lastname").trim().isLength({ min: 3, max: 50 }).escape(),
  body("mail").trim().isEmail(),
  body("cellphone").trim().isLength({ min: 6, max: 20 }),
  body("dni").trim().isLength({ min: 8, max: 9 }).escape(),
  body("birthday").trim().isLength({ min: 6, max: 15 }),
  body("social_number").trim().isString().isLength({ min: 10, max: 25 }),
  validatorManager,
];

/**  PATIENT UPDATE  **/
export const personalDataValidator = [
  body("name").trim().isLength({ min: 3, max: 50 }).escape(),
  body("lastname").trim().isLength({ min: 3, max: 50 }).escape(),
  body("birthday").trim().isLength({ min: 6, max: 15 }),
  body("cellphone").trim().isLength({ min: 6, max: 20 }),
  validatorManager,
];

/**  CHECK SOCIALNUMBER  **/
export const SNValidator = [
  body("social_number").trim().isString().isLength({ min: 10, max: 25 }),
  validatorManager,
];
