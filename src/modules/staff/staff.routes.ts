import { Router } from "express";

import StaffController from "./staff.controller";
//Middleware:
import {
  validateStaffBody,
  validateLoginBody,
} from "../../middlewares/bodyValidator";

const controller = new StaffController();

const staffRouter = Router();

staffRouter.post("/register", validateStaffBody, controller.register);
staffRouter.post("/login", validateLoginBody, controller.login);

export default staffRouter;
