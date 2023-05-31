import { validatorManager } from "./bodyValidator";
import { body } from "express-validator";

/**  STAFF REGISTER **/
export const validateStaffBody = [
  body("name").trim().isLength({ min: 3, max: 50 }).escape(),
  body("lastname").trim().isLength({ min: 3, max: 50 }).escape(),
  body("mail").trim().isEmail(),
  body("cellphone").trim().isLength({ min: 6, max: 20 }),
  body("dni").trim().isLength({ min: 8, max: 9 }).escape(),
  body("birthday").trim().isLength({ min: 6, max: 15 }),
  body("username").trim().isLength({ min: 3, max: 50 }).escape(),
  body("password").trim().isLength({ min: 6, max: 30 }),
  body("status").trim().isLength({ min: 3, max: 20 }).escape(),
  body("seniority").trim().isLength({ min: 6, max: 15 }),
  body("salary").trim().isFloat({ min: 500, max: 9999 }),
  validatorManager,
];

/**  STAFF LOGIN **/
export const validateLoginBody = [
  body("username").trim().isLength({ min: 3, max: 50 }).escape(),
  body("password").trim().isLength({ min: 6, max: 30 }),
  validatorManager,
];

/**  STAFF UPDATE  **/
export const UpdatePDStaffBody = [
  body("name").trim().isLength({ min: 3, max: 50 }).escape(),
  body("lastname").trim().isLength({ min: 3, max: 50 }).escape(),
  body("birthday").trim().isLength({ min: 6, max: 15 }),
  body("cellphone").trim().isLength({ min: 6, max: 20 }),
  validatorManager,
];

/** CHECK EMAIL  **/
export const mailValidator = [body("mail").trim().isEmail(), validatorManager];

/** CHECK USERNAME  **/
export const usernameValidator = [
  body("username").trim().isLength({ min: 3, max: 50 }).escape(),
  validatorManager,
];

/** CHECK PASSWORD  **/
export const passwordValidator = [
  body("password").trim().isLength({ min: 6, max: 30 }),
  validatorManager,
];

/** CHECK SALARY  **/
export const salaryValidator = [
  body("salary").trim().isFloat({ min: 500, max: 9999 }),
  validatorManager,
];

export const statusValidator = [
  body("status").trim().isLength({ min: 3, max: 20 }).escape(),
  validatorManager,
];
