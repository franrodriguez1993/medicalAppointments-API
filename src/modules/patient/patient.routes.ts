import { Router } from "express";
import PatientController from "./patient.controller";
import {
  patientValidator,
  personalDataValidator,
  SNValidator,
} from "../../middlewares/bodyPatientValidator";
import { mailValidator } from "../../middlewares/bodyStaffValidator";
import { requireToken } from "../../middlewares/requireToken";

const controller = new PatientController();
const routerPatient = Router();

routerPatient.post("/", requireToken, patientValidator, controller.create);
routerPatient.get("/", requireToken, controller.list);
routerPatient.get("/:dni", requireToken, controller.findByDNI);
routerPatient.put(
  "/:id/personal",
  requireToken,
  personalDataValidator,
  controller.updatePD
);
routerPatient.put(
  "/:id/socialnumber",
  requireToken,
  SNValidator,
  controller.updateSN
);
routerPatient.put(
  "/:id/mail",
  requireToken,
  mailValidator,
  controller.changeMail
);
export default routerPatient;
