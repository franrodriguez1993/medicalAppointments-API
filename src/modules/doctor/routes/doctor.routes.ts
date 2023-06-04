import { Router } from "express";
import DoctorController from "../controllers/doctor.controller";
import {
  doctorBodyUpdateValidator,
  doctorBodyValidator,
  scheduleValidator,
} from "../../../middlewares/bodyDoctorValidator";
import { mailValidator } from "../../../middlewares/bodyStaffValidator";

const doctorRouter = Router();
const controller = new DoctorController();

doctorRouter.post("/", doctorBodyValidator, controller.create);
doctorRouter.get("/", controller.list);
doctorRouter.get("/:id", controller.findByID);
doctorRouter.put("/:id/data", doctorBodyUpdateValidator, controller.updateData);
doctorRouter.put("/:id/mail", mailValidator, controller.updateMail);
doctorRouter.put("/:id/specialty", controller.updateSpecialty);
doctorRouter.post("/:id/schedule", scheduleValidator, controller.addSchedule);
doctorRouter.put("/:id/schedule", scheduleValidator, controller.updateSchedule);
doctorRouter.delete("/:id/schedule/:day", controller.deleteSchedule);
export default doctorRouter;
