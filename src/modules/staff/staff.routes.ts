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
import { requireToken } from "../../middlewares/requireToken";

const controller = new StaffController();

const staffRouter = Router();

staffRouter.post("/register", validateStaffBody, controller.register);
staffRouter.post("/login", validateLoginBody, controller.login);
staffRouter.put(
  "/:id/personal",
  UpdatePDStaffBody,
  controller.updatePersonalData
);
staffRouter.get("/", requireToken, controller.list);
staffRouter.put("/:id/mail", mailValidator, controller.changeMail);
staffRouter.put(
  "/:id/username",
  requireToken,
  usernameValidator,
  controller.changeUsername
);
staffRouter.put(
  "/:id/password",
  requireToken,
  passwordValidator,
  controller.changePassword
);
staffRouter.put(
  "/:id/salary",
  requireToken,
  salaryValidator,
  controller.updateSalary
);
staffRouter.put(
  "/:id/status",
  requireToken,
  statusValidator,
  controller.updateStatus
);

staffRouter.get("/:id", requireToken, controller.findByID);

export default staffRouter;
