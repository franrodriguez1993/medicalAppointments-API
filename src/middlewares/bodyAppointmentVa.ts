import { body } from "express-validator";
import { validatorManager } from "./bodyValidator";

export const AppointmentValidator = [
  body("date").isDate().notEmpty(),
  body("id_doctor").notEmpty(),
  body("id_staff").notEmpty(),
  body("id_patient").notEmpty(),
  body("id_day").notEmpty(),
  validatorManager,
];
