"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_controller_1 = __importDefault(require("./appointment.controller"));
const bodyAppointmentVa_1 = require("../../middlewares/bodyAppointmentVa");
const requireToken_1 = require("../../middlewares/requireToken");
const controller = new appointment_controller_1.default();
const routerAppointment = (0, express_1.Router)();
routerAppointment.post("/", requireToken_1.requireToken, bodyAppointmentVa_1.AppointmentValidator, controller.create);
routerAppointment.get("/:id", requireToken_1.requireToken, controller.listAppointment);
routerAppointment.delete("/:id", requireToken_1.requireToken, controller.deleteOne);
exports.default = routerAppointment;
