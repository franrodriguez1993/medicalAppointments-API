import { Router } from "express";
import PatientController from "./patient.controller";
import { patientValidator } from "../../middlewares/bodyPatientValidator";

const controller = new PatientController();
const routerPatient = Router();

routerPatient.post("/", patientValidator, controller.create);

export default routerPatient;
