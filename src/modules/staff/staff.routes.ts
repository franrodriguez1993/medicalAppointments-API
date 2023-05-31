import { Router } from "express";

import StaffController from "./staff.controllers";

import {
  validateStaffBody,
  validateLoginBody,
  UpdatePDStaffBody,
  usernameValidator,
  mailValidator,
  passwordValidator,
  salaryValidator,
  statusValidator,
} from "../../middlewares/bodyStaffValidator";

const controller = new StaffController();

const staffRouter = Router();

staffRouter.post("/register", validateStaffBody, controller.register);
staffRouter.post("/login", validateLoginBody, controller.login);
staffRouter.put(
  "/update/personal/:id",
  UpdatePDStaffBody,
  controller.updatePersonalData
);
staffRouter.put("/update/mail/:id", mailValidator, controller.changeMail);
staffRouter.put(
  "/update/username/:id",
  usernameValidator,
  controller.changeUsername
);
staffRouter.put(
  "/update/password/:id",
  passwordValidator,
  controller.changePassword
);
staffRouter.put("/update/salary/:id", salaryValidator, controller.updateSalary);

staffRouter.put("/update/status/:id", statusValidator, controller.updateStatus);

staffRouter.get("/:id", controller.findByID);

export default staffRouter;
