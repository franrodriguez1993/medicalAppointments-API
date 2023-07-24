"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctor_controller_1 = __importDefault(require("../controllers/doctor.controller"));
const bodyDoctorValidator_1 = require("../../../middlewares/bodyDoctorValidator");
const bodyStaffValidator_1 = require("../../../middlewares/bodyStaffValidator");
const requireToken_1 = require("../../../middlewares/requireToken");
const doctorRouter = (0, express_1.Router)();
const controller = new doctor_controller_1.default();
doctorRouter.post("/", requireToken_1.requireToken, bodyDoctorValidator_1.doctorBodyValidator, controller.create);
doctorRouter.get("/", requireToken_1.requireToken, controller.list);
doctorRouter.get("/:id", requireToken_1.requireToken, controller.findByID);
doctorRouter.put("/:id/data", requireToken_1.requireToken, bodyDoctorValidator_1.doctorBodyUpdateValidator, controller.updateData);
doctorRouter.put("/:id/mail", requireToken_1.requireToken, bodyStaffValidator_1.mailValidator, controller.updateMail);
doctorRouter.put("/:id/specialty", requireToken_1.requireToken, controller.updateSpecialty);
doctorRouter.post("/:id/schedule", requireToken_1.requireToken, bodyDoctorValidator_1.scheduleValidator, controller.addSchedule);
doctorRouter.put("/:id/schedule", requireToken_1.requireToken, bodyDoctorValidator_1.scheduleValidator, controller.updateSchedule);
doctorRouter.delete("/:id/schedule/:day", requireToken_1.requireToken, controller.deleteSchedule);
exports.default = doctorRouter;