import { Router } from "express";

import StaffController from "./staff.controllers";

import {
  validateStaffBody,
  validateLoginBody,
  UpdatePDStaffBody,
  usernameValidator,
  mailValidator,
  checkPassword,
  checkSalary,
  checkStatus,
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
  checkPassword,
  controller.changePassword
);
staffRouter.put("/update/salary/:id", checkSalary, controller.updateSalary);

staffRouter.put("/update/status/:id", checkStatus, controller.updateStatus);

staffRouter.get("/:id", controller.findByID);

export default staffRouter;
