"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const configServer_1 = __importDefault(require("./config/configServer"));
require("dotenv/config");
/**   ROUTERS    **/
const staff_routes_1 = __importDefault(require("./modules/staff/staff.routes"));
const specialty_routes_1 = __importDefault(require("./modules/doctor/routes/specialty.routes"));
const doctor_routes_1 = __importDefault(require("./modules/doctor/routes/doctor.routes"));
const patient_routes_1 = __importDefault(require("./modules/patient/patient.routes"));
const appointment_routes_1 = __importDefault(require("./modules/appointment/appointment.routes"));
const app = (0, express_1.default)();
/**   CORS    **/
const urlList = [configServer_1.default.cors.url];
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }
        if (urlList.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
/** ENDPOINTS  **/
app.use("/api/v1/staff", staff_routes_1.default);
app.use("/api/v1/specialty", specialty_routes_1.default);
app.use("/api/v1/doctor", doctor_routes_1.default);
app.use("/api/v1/patient", patient_routes_1.default);
app.use("/api/v1/appointment", appointment_routes_1.default);
exports.default = app;
