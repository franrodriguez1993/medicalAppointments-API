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
  "/:id/personal",
  UpdatePDStaffBody,
  controller.updatePersonalData
);
staffRouter.get("/", controller.list);
staffRouter.put("/:id/mail", mailValidator, controller.changeMail);
staffRouter.put("/:id/username", usernameValidator, controller.changeUsername);
staffRouter.put("/:id/password", passwordValidator, controller.changePassword);
staffRouter.put("/:id/salary", salaryValidator, controller.updateSalary);
staffRouter.put("/:id/status", statusValidator, controller.updateStatus);

staffRouter.get("/:id", controller.findByID);

export default staffRouter;
