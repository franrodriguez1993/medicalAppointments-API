import { validatorManager } from "./bodyValidator";
import { body } from "express-validator";

/** BODY SPECIALTY **/

export const specialtyValidator = [
  body("name").trim().isString().isLength({ min: 3, max: 20 }).escape(),
  validatorManager,
];

/**  BODY DOCTOR **/

/**  STAFF REGISTER **/
export const doctorBodyValidator = [
  body("name").trim().isLength({ min: 3, max: 50 }).escape(),
  body("lastname").trim().isLength({ min: 3, max: 50 }).escape(),
  body("mail").trim().isEmail(),
  body("cellphone").trim().isLength({ min: 6, max: 20 }),
  body("dni").trim().isLength({ min: 8, max: 9 }).escape(),
  body("birthday").trim().isLength({ min: 6, max: 15 }),
  body("id_specialty").optional().trim().isString().isLength({ max: 50 }),
  validatorManager,
];

/**  UPDATE DATA   **/

export const doctorBodyUpdateValidator = [
  body("name").trim().isLength({ min: 3, max: 50 }).escape(),
  body("lastname").trim().isLength({ min: 3, max: 50 }).escape(),
  body("birthday").trim().isLength({ min: 6, max: 15 }),
  body("cellphone").trim().isLength({ min: 6, max: 20 }),
  validatorManager,
];

/**  CREATE SCHEDULE  **/
export const scheduleValidator = [
  body("day").trim().isString().isLength({ min: 6, max: 15 }).escape(),
  body("hourIn").trim().isTime({ hourFormat: "hour24", mode: "withSeconds" }),
  body("hourOut").trim().isTime({ hourFormat: "hour24", mode: "withSeconds" }),
  validatorManager,
];
