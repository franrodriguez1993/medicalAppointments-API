import { Router } from "express";
import AppointmentController from "./appointment.controller";
import { AppointmentValidator } from "../../middlewares/bodyAppointmentVa";

const controller = new AppointmentController();

const routerAppointment = Router();

routerAppointment.post("/", AppointmentValidator, controller.create);
routerAppointment.get("/:id", controller.listAppointment);
routerAppointment.delete("/:id", controller.deleteOne);

export default routerAppointment;
