import { Router } from "express";
import PatientController from "./patient.controller";
import {
  patientValidator,
  personalDataValidator,
  SNValidator,
} from "../../middlewares/bodyPatientValidator";
import { mailValidator } from "../../middlewares/bodyStaffValidator";

const controller = new PatientController();
const routerPatient = Router();

routerPatient.post("/", patientValidator, controller.create);
routerPatient.get("/:dni", controller.findByDNI);
routerPatient.put("/:id/personal", personalDataValidator, controller.updatePD);
routerPatient.put("/:id/socialnumber", SNValidator, controller.updateSN);
routerPatient.put("/:id/mail", mailValidator, controller.changeMail);
export default routerPatient;
