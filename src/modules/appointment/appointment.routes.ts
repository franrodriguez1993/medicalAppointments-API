import { Router } from "express";
import AppointmentController from "./appointment.controller";
import { AppointmentValidator } from "../../middlewares/bodyAppointmentVa";
import { requireToken } from "../../middlewares/requireToken";

const controller = new AppointmentController();

const routerAppointment = Router();

routerAppointment.post(
  "/",
  requireToken,
  AppointmentValidator,
  controller.create
);
routerAppointment.get("/:id", requireToken, controller.listAppointment);
routerAppointment.delete("/:id", requireToken, controller.deleteOne);

export default routerAppointment;
