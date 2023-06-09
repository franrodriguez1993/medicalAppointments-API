"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
/**   ROUTERS    **/
const staff_routes_1 = __importDefault(require("./modules/staff/staff.routes"));
const specialty_routes_1 = __importDefault(require("./modules/doctor/routes/specialty.routes"));
const doctor_routes_1 = __importDefault(require("./modules/doctor/routes/doctor.routes"));
const patient_routes_1 = __importDefault(require("./modules/patient/patient.routes"));
const appointment_routes_1 = __importDefault(require("./modules/appointment/appointment.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/staff", staff_routes_1.default);
app.use("/api/v1/specialty", specialty_routes_1.default);
app.use("/api/v1/doctor", doctor_routes_1.default);
app.use("/api/v1/patient", patient_routes_1.default);
app.use("/api/v1/appointment", appointment_routes_1.default);
exports.default = app;
