import { Router } from "express";
import DoctorController from "../controllers/doctor.controller";
import {
  doctorBodyUpdateValidator,
  doctorBodyValidator,
  scheduleValidator,
} from "../../../middlewares/bodyDoctorValidator";
import { mailValidator } from "../../../middlewares/bodyStaffValidator";
import { requireToken } from "../../../middlewares/requireToken";

const doctorRouter = Router();
const controller = new DoctorController();

doctorRouter.post("/", requireToken, doctorBodyValidator, controller.create);
doctorRouter.get("/", requireToken, controller.list);
doctorRouter.get("/:id", requireToken, controller.findByID);
doctorRouter.put(
  "/:id/data",
  requireToken,
  doctorBodyUpdateValidator,
  controller.updateData
);
doctorRouter.put(
  "/:id/mail",
  requireToken,
  mailValidator,
  controller.updateMail
);
doctorRouter.put("/:id/specialty", requireToken, controller.updateSpecialty);
doctorRouter.post(
  "/:id/schedule",
  requireToken,
  scheduleValidator,
  controller.addSchedule
);
doctorRouter.put(
  "/:id/schedule",
  requireToken,
  scheduleValidator,
  controller.updateSchedule
);
doctorRouter.delete(
  "/:id/schedule/:day",
  requireToken,
  controller.deleteSchedule
);
export default doctorRouter;
