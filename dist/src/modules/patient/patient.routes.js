"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patient_controller_1 = __importDefault(require("./patient.controller"));
const bodyPatientValidator_1 = require("../../middlewares/bodyPatientValidator");
const bodyStaffValidator_1 = require("../../middlewares/bodyStaffValidator");
const requireToken_1 = require("../../middlewares/requireToken");
const controller = new patient_controller_1.default();
const routerPatient = (0, express_1.Router)();
routerPatient.post("/", requireToken_1.requireToken, bodyPatientValidator_1.patientValidator, controller.create);
routerPatient.get("/", requireToken_1.requireToken, controller.list);
routerPatient.get("/:dni", requireToken_1.requireToken, controller.findByDNI);
routerPatient.put("/:id/personal", requireToken_1.requireToken, bodyPatientValidator_1.personalDataValidator, controller.updatePD);
routerPatient.put("/:id/socialnumber", requireToken_1.requireToken, bodyPatientValidator_1.SNValidator, controller.updateSN);
routerPatient.put("/:id/mail", requireToken_1.requireToken, bodyStaffValidator_1.mailValidator, controller.changeMail);
exports.default = routerPatient;
